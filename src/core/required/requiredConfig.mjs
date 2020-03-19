import arrayGetUnique from "@corefunc/corefunc/array/get/unique.mjs";

import isArrayEmpty from "../../util/check/isArrayEmpty";
import isString from "../../util/is/isString";
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
  if (isArrayEmpty(propertiesRequired)) {
    return [];
  }
  return arrayGetUnique(propertiesRequired).map((value) => {
    if (!isString(value)) {
      throw new TypeError(`'Required' expect array of strings. Value: '${jsonStringify(value)}'.`);
    }
    return value;
  });
}
