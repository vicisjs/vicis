import arrayGetUnique from "@corefunc/corefunc/array/get/unique.mjs";
import arrayIsEmpty from "@corefunc/corefunc/array/is/empty.mjs";
import isString from "@corefunc/corefunc/is/string.mjs";

import jsonStringify from "../../util/json/stringify";

/**
 * @name definedConfig
 * @throws TypeError
 * @param {Array.<string>} propertiesMustBeDefined
 * @returns {Array.<string>}
 */
export default function definedConfig(propertiesMustBeDefined) {
  if (!Array.isArray(propertiesMustBeDefined)) {
    throw new TypeError("'Defined' should be an array");
  }
  if (arrayIsEmpty(propertiesMustBeDefined)) {
    return [];
  }
  return arrayGetUnique(propertiesMustBeDefined).map((value) => {
    if (!isString(value)) {
      throw new TypeError(`'Defined' expect array of strings. Value: '${jsonStringify(value)}'.`);
    }
    return value;
  });
}
