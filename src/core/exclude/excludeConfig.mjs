import arrayGetUnique from "@corefunc/corefunc/array/get/unique.mjs";

import isArrayEmpty from "../../util/check/isArrayEmpty";
import isRegExp from "../../util/is/isRegExp";
import isString from "../../util/is/isString";
import jsonStringify from "../../util/json/stringify";

/**
 * @name excludeConfig
 * @throws TypeError
 * @param {Array.<string|RegExp>} propertiesToExclude
 * @returns {Array.<string|RegExp>}
 */
export default function excludeConfig(propertiesToExclude) {
  if (!Array.isArray(propertiesToExclude)) {
    throw new TypeError("'Exclude' should be an array");
  }
  if (isArrayEmpty(propertiesToExclude)) {
    return [];
  }
  return arrayGetUnique(propertiesToExclude).map((value) => {
    if (!isString(value) && !isRegExp(value)) {
      throw new TypeError(
        `'Exclude' expect array of strings or regular expressions. Value: '${jsonStringify(value)}'.`,
      );
    }
    return value;
  });
}
