import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class FoodRoute extends Route {
  @service store;
  @service router;

  // Visually, the store is unload but in the ember inspector, the store is still with both food and wine
  /*  async beforeModel() {
    this.store.unloadAll('product');
  } */

  // https://stackoverflow.com/questions/31342245/how-to-destroy-a-route-model-on-transition-in-ember-js
  // same as beforeModel
  // This event is triggered when the router completely exits this route. It is not executed when the model for the route changes
  /* deactivate() {
    this.store.unloadAll('product');
  } */

  // no difference
  /*  willTransition() {
    let products = this.store.peekAll('product');
    products.forEach((product) => this.store.unloadRecord(product));
  }
 */

  // same as beforeModel
  /* resetController() {
    this.store.unloadAll('product');
  } */

  // Isn't a bug but a side-effect --> https://github.com/emberjs/data/issues/4938#issuecomment-383340318
  // it retains empty InternalModel instances for records that do have relationships.
  //This is because we use InternalModel both as resource and resource-identifier in json-api terms.
  //So long as a relationship alerts to us that a resource exists, we must keep an identifier to it.

  async model() {
    // same as beforeModel
    //this.store.unloadAll('product');

    // Return the records as the model
    return this.store.findAll('product');
  }
}
