import RESTSerializer from '@ember-data/serializer/rest';

export default class ProductSerializer extends RESTSerializer {
  // Override the `modelNameFromPayloadKey` method to use the correct model name
  modelNameFromPayloadKey(payloadKey) {
    if (payloadKey === 'food' || payloadKey === 'wine') {
      return 'product';
    }

    return super.modelNameFromPayloadKey(payloadKey);
  }
}
