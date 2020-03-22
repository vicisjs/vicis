import arrayIsEmpty from "@corefunc/corefunc/array/is/empty.mjs";
import objectKeysOrder from "@corefunc/corefunc/object/keys/order.mjs";

import CONFIG_SORT from "../../const/configSort";

import orderConfig from "./orderConfig";

/**
 * @name order
 * @throws TypeError
 * @param {Object} data
 * @param {Array.<string>=} propertiesToStreamline
 * @param {boolean=} sort
 * @returns {Object}
 */
export default function order(data, propertiesToStreamline = [], sort = CONFIG_SORT) {
  const config = orderConfig(propertiesToStreamline);
  if (arrayIsEmpty(config)) {
    return data;
  }
  return objectKeysOrder(data, propertiesToStreamline, sort);
}
