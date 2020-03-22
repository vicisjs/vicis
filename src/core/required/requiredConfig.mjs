import arrayGetUnique from "@corefunc/corefunc/array/get/unique.mjs";
import arrayIsEmpty from "@corefunc/corefunc/array/is/empty.mjs";
import isString from "@corefunc/corefunc/is/string.mjs";

import jsonStringify from "../../util/json/stringify";

/**
 * @name requiredConfig
 * @throws TypeError
 * @param {Array.<string>} propertiesRequired
 * @returns {Array.<string>}
 */
export default function requiredConfig(propertiesRequired) {
  if (!Array.isArray(propertiesRequired)) {
    throw new TypeError("'Required' should be an array");
  }
  if (arrayIsEmpty(propertiesRequired)) {
    return [];
  }
  return arrayGetUnique(propertiesRequired).map((value) => {
    if (!isString(value)) {
      throw new TypeError(`'Required' expect array of strings. Value: '${jsonStringify(value)}'.`);
    }
    return value;
  });
}
