import { IExclude } from "../../interface/config/IExclude";

import { arrayGetUnique } from "../../util/array/get/unique";
import { arrayIsEmpty } from "../../util/array/is/empty";
import { isRegExp } from "../../util/is/regexp";
import { isString } from "../../util/is/string";
import { jsonStringify } from "../../util/json/stringify";

/**
 * @name excludeConfig
 * @throws TypeError
 * @param {Array.<string|RegExp>} propertiesToExclude
 * @returns {Array.<string|RegExp>}
 */
function excludeConfig(propertiesToExclude: IExclude): IExclude {
  if (!Array.isArray(propertiesToExclude)) {
    throw new TypeError("'Exclude' should be an array");
  }
  if (arrayIsEmpty(propertiesToExclude)) {
    return [];
  }
  return arrayGetUnique(propertiesToExclude).map((value) => {
    if (!isString(value) && !isRegExp(value)) {
      throw new TypeError(
        `'Exclude' expect array of strings or regular expressions. Value: '${
          jsonStringify(value)
        }'.`,
      );
    }
    return value;
  });
}

export { excludeConfig };
