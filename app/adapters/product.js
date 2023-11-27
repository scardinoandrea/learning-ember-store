import RESTAdapter from '@ember-data/adapter/rest';
import { service } from '@ember/service';

export default class ProductAdapter extends RESTAdapter {
  namespace = 'api';

  @service router;

  /*  This method is called before the route has finished rendering, so it may not be possible to wait until the route is fully rendered before calling it  
  pathForType() {
    if (this.router.currentRouteName === 'food') {
      return 'food.json';
    } else if (this.router.currentRouteName === 'wine') {
      return 'wine.json';
    }
  } */

  /*   findAll() {
    if (this.router.currentRouteName === 'food') {
      this.namespace = 'api/food.json';
    } else if (this.router.currentRouteName === 'wine') {
      this.namespace = 'api/wine.json';
    }

    return super.findAll(...arguments);
  } */

  // Override the `pathForType` method to use a different endpoint name
  /* pathForType(type) {
    if (type === 'product') {
      if (this.router.currentRouteName === 'wine') {
        return 'wine.json';
      }
      return 'food.json';
    }
    return super.pathForType(type);
  } */

  buildURL(modelName, id, snapshot, requestType, query) {
    if (modelName === 'product') {
      if (this.router.currentRouteName === 'wine') {
        return '/api/wine.json';
      }

      return '/api/food.json';
    }
    return super.buildURL(modelName, id, snapshot, requestType, query);
  }
}
