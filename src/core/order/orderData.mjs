import arrayIsEmpty from "@corefunc/corefunc/array/is/empty.mjs";
import objectKeysOrder from "@corefunc/corefunc/object/keys/order.mjs";

import CONFIG_SORT from "../../const/configSort.mjs";

/**
 * @name orderData
 * @param {Array.<string>} propertiesToStreamline
 * @param {Object} data
 * @param {boolean=} sort
 * @returns {Object}
 */
export default function orderData(propertiesToStreamline, data, sort = CONFIG_SORT) {
  if (arrayIsEmpty(propertiesToStreamline)) {
    return data;
  }
  return objectKeysOrder(data, propertiesToStreamline, sort);
}
