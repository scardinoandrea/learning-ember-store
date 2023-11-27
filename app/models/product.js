import Model, { attr } from '@ember-data/model';
import ProductAdapter from '../adapters/product';

export default class ProductModel extends Model {
  @attr('string') name;
  @attr('string') price;
  @attr('number') daysInStock;

  static adapter = new ProductAdapter();
}
