import RESTAdapter from '@ember-data/adapter/rest';
import { service } from '@ember/service';

export default class ProductAdapter extends RESTAdapter {
  namespace = 'api';

  @service router;

  // Override the `pathForType` method to use a different endpoint name
  //This method is called before the route has finished rendering, so it may not be possible to wait until the route is fully rendered before calling it
  pathForType(type) {
    console.log(this.router);
    const currentRoute =
      this.router.currentRouteName ?? window.location.pathname.substring(1);
    if (currentRoute === 'food') {
      return 'food.json';
    }
    if (currentRoute === 'wine') {
      return 'wine.json';
    }
    return super.pathForType(type);
  }

  /* buildURL(modelName, id, snapshot, requestType, query) {
    if (modelName === 'product') {
      const currentRoute =
        this.router.currentRouteName ?? window.location.pathname.substring(1);
      if (currentRoute === 'wine') {
        return '/api/wine.json';
      }

      return '/api/food.json';
    }
    return super.buildURL(modelName, id, snapshot, requestType, query);
  } */
}
