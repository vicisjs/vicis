import arrayGetUnique from "@corefunc/corefunc/array/get/unique";
import arrayIsEmpty from "@corefunc/corefunc/array/is/empty";
import isRegExp from "@corefunc/corefunc/is/regexp";
import isString from "@corefunc/corefunc/is/string";

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
  if (arrayIsEmpty(propertiesToExclude)) {
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
