import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class WineRoute extends Route {
  @service store;

  /* async beforeModel() {
    // Empty the store before transitioning
    this.store.unloadAll('product');
  } */

  deactivate() {
    this.store.unloadAll('product');
  }

  /* willTransition() {
    let products = this.store.peekAll('product');
    products.forEach((product) => this.store.unloadRecord(product));
  } */

  /* resetController() {
    this.store.unloadAll('product');
  } */

  async model() {
    //this.store.unloadAll('product');

    // Return the records as the model
    return this.store.findAll('product');
  }
}
