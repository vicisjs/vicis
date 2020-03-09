import CONFIG_SORT from "../../const/configSort";
import isArrayEmpty from "../../util/check/isArrayEmpty";
import objectOrderKeys from "../../util/object/orderKeys";

/**
 * @name orderData
 * @param {Array.<string>} propertiesToStreamline
 * @param {Object} data
 * @param {boolean=} sort
 * @returns {Object}
 */
export default function orderData(propertiesToStreamline, data, sort = CONFIG_SORT) {
  if (isArrayEmpty(propertiesToStreamline)) {
    return data;
  }
  return objectOrderKeys(data, propertiesToStreamline, sort);
}
