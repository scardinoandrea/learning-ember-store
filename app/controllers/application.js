import Controller from '@ember/controller';
import { service } from '@ember/service';

export default class ApplicationController extends Controller {
  @service router;

  get isFoodRoute() {
    return this.router.currentRouteName === 'food';
  }

  get isWineRoute() {
    return this.router.currentRouteName === 'wine';
  }
}
