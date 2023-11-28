<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">

<h3 align="center">Notes </h3>

</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#one-model-different-endpoints-and-route">One model, different endpoints and route</a>
    </li>
    <li>
      <a href="#unloading-the-store">Unloading the store</a>
    </li>
  </ol>
</details>

## One model, different endpoints and route

- By default Emberjs will look for an api with the same name as the model
  (e.g.) `this.store.findAll(product)` will for the data in product.json
- If you want to change how you get the data you use an _adapter_ (e.g. use food.json when `this.store.findAll(product)`)
- If you want to change the data you use a _serializer_ (e.g. change `days_in_stock` for `daysInStock`, change `modelNameFromPayloadKey` from food or wine to product)
- When working with APIs that have different endpoint names than your model names, you can customize the adapter and serializer in Ember.js to map your model to the correct endpoint. This involves creating a new adapter and serializer for each endpoint and specifying the `pathForType` or `buildURL` method in the adapter to map the model to the correct endpoint name.
- [WIP] How to change _correctly_ the endpoint used to fill a model base on the url
- pathForType and buildURL loads before the route is render

`pathForType` is a method that is used to map a model name to an endpoint name. It takes a single argument, which is the name of the model, and returns a string that represents the endpoint name for that model. You can use `pathForType` to customize the adapter to work with APIs that have endpoint names that are different from your model names.

For example, if you have a product model and your API uses the endpoint name items instead of products, you can define the `pathForType` method in your adapter to map the product model to the items endpoint:

```javascript
// app/adapters/application.js
import JSONAPIAdapter from '@ember-data/adapter/json-api';

export default class ApplicationAdapter extends JSONAPIAdapter {
  pathForType(type) {
    if (type === 'product') {
      return 'items';
    } else {
      return this._super(...arguments);
    }
  }
}
```

`buildURL`, on the other hand, is a method that is used to build the URL for a request based on the endpoint name and other parameters. It takes several arguments, including the type of the model, the ID of the record (if applicable), and any query parameters. You can use `buildURL` to customize the adapter to work with APIs that have complex URL structures or require additional query parameters.

For example, if your API requires an API key to be included in the URL for every request, you can define the `buildURL` method in your adapter to add the API key to the URL:

```javascript
// app/adapters/application.js
import JSONAPIAdapter from '@ember-data/adapter/json-api';

export default class ApplicationAdapter extends JSONAPIAdapter {
  buildURL(...args) {
    let url = super.buildURL(...args);
    url += '?api_key=12345';
    return url;
  }
}
```

In summary, `pathForType` is used to map a model name to an endpoint name, while `buildURL` is used to build the URL for a request based on the endpoint name and other parameters. Both methods can be used to customize the adapter to work with APIs that have different endpoint names than your model names, but they serve different purposes and are used in different contexts.

<p align="right">(<a href="#top">back to top</a>)</p>

## Unloading the store

- Different methods are used and people have different opinions on what is the best
- Records that have relationship with other models won't be completely unload -> therefore or the record is disconnected from other models or all the models in the store are emptied
- Most popular opinion was to use deactivate
- willTransition and beforeModel works just before the transition is done --> if a model in use is emptied and the actual route is still being show ur can cause a sync issue
- resetController works when the route is exiting or when the model changes --> same problem as before
- deactivate works when the route is completely deactivate (in the middle of a transition) --> acts when no route is active, avoiding sync issues

### Comparing deactivate, willTransition and resetController

All three methods deactivate, willTransition, and resetController are hooks in Ember.js that are called when a route is exited or transitioned away from. They are often used to clean up or reset the state of the route or its associated components. Here's a comparison of these hooks and how they can be used to unload all records of the product model from the store:

_deactivate hook_: This hook is called when the route is being deactivated, either because the user is transitioning to a different route or because the route is being removed from the active route hierarchy. You can use this hook to unload all records of the product model from the store. Here's an example:

```javascript
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default class MyRoute extends Route {
  @service store;

  deactivate() {
    this.store.unloadAll('product');
  }
}
```

Pros:

- This hook is guaranteed to be called when the route is being deactivated, so it's a reliable way to clean up the state of the route.
- It's a simple and straightforward way to unload all records of a specific model from the store.
  Cons:

- If the user is transitioning to a different route that also uses the product model, the records will need to be fetched from the server again when the new route is entered, which could be slow or inefficient.

_willTransition hook_: This hook is called when the user is about to transition to a different route. You can use this hook to unload all records of the product model from the store. Here's an example:

```javascript
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default class MyRoute extends Route {
  @service store;

  willTransition() {
    this.store.unloadAll('product');
  }
}
```

Pros:

- This hook is called before the user transitions to a different route, so you can unload the records before the new route is entered.
- It's a simple and straightforward way to unload all records of a specific model from the store.

Cons:

- If the user transitions back to the same route later, the records will need to be fetched from the server again, which could be slow or inefficient.

_resetController hook_: This hook is called when the route's controller is being reset, which can happen when the user transitions to the same route with different parameters or when the route is being re-entered after being exited. You can use this hook to unload all records of the product model from the store. Here's an example:

```javascript
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default class MyRoute extends Route {
  @service store;

  resetController(controller, isExiting) {
    if (isExiting) {
      this.store.unloadAll('product');
    }
  }
}
```

Pros:

- This hook is called when the route's controller is being reset, which can be a good time to clean up the state of the route.
- It only unloads the records when the route is being exited, so the records will still be in the store if the user transitions back to the same route later.

Cons:

- If the user transitions to a different route that also uses the product model, the records will need to be fetched from the server again when the new route is entered, which could be slow or inefficient.

Using unloadAll('model') to remove all records of a model from the store can be a useful technique to manage the state of your application. However, it's important to consider the pros and cons of each hook and choose the one that best fits your specific use case. In general, _deactivate and willTransition are better suited for cleaning up the state of the route_, while resetController is better suited for resetting the state of the route.

<p align="right">(<a href="#top">back to top</a>)</p>
