import arrayUnique from "../../util/array/unique";
import isArrayEmpty from "../../util/check/isArrayEmpty";
import isString from "../../util/is/isString";
import jsonStringify from "../../util/json/stringify";

/**
 * @name orderConfig
 * @throws TypeError
 * @param {Array.<string>} propertiesToStreamline
 * @returns {Array.<string>}
 */
export default function orderConfig(propertiesToStreamline) {
  if (!Array.isArray(propertiesToStreamline)) {
    throw new TypeError("'Order' should be an array");
  }
  if (isArrayEmpty(propertiesToStreamline)) {
    return [];
  }
  return arrayUnique(propertiesToStreamline, false).map((value) => {
    if (!isString(value)) {
      throw new TypeError(`'Order' expect array of strings. Value: '${jsonStringify(value)}'.`);
    }
    return value;
  });
}
