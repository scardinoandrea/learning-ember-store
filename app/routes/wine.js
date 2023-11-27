import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class WineRoute extends Route {
  @service store;

  async model() {
    // Return the records as the model
    return this.store.findAll('product');
  }
}
