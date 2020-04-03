import arrayGetUnique from "@corefunc/corefunc/array/get/unique.mjs";
import arrayIsEmpty from "@corefunc/corefunc/array/is/empty.mjs";
import isString from "@corefunc/corefunc/is/string.mjs";

import jsonStringify from "../../util/json/stringify.mjs";

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
  if (arrayIsEmpty(propertiesToStreamline)) {
    return [];
  }
  return arrayGetUnique(propertiesToStreamline, false).map((value) => {
    if (!isString(value)) {
      throw new TypeError(`'Order' expect array of strings. Value: '${jsonStringify(value)}'.`);
    }
    return value;
  });
}
