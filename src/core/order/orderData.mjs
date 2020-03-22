import arrayIsEmpty from "@corefunc/corefunc/array/is/empty.mjs";

import CONFIG_SORT from "../../const/configSort";

import objectOrderKeys from "../../util/object/orderKeys";

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
  return objectOrderKeys(data, propertiesToStreamline, sort);
}
