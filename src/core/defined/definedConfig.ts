import { IDefined } from "../../interface/config/IDefined";

import { arrayGetUnique } from "../../util/array/get/unique";
import { arrayIsEmpty } from "../../util/array/is/empty";
import { isString } from "../../util/is/string";
import { jsonStringify } from "../../util/json/stringify";

/**
 * @name definedConfig
 * @throws TypeError
 * @param {Array.<string>} propertiesMustBeDefined
 * @returns {Array.<string>}
 */
export function definedConfig(propertiesMustBeDefined: IDefined): IDefined {
  if (!Array.isArray(propertiesMustBeDefined)) {
    throw new TypeError("'Defined' should be an array");
  }
  if (arrayIsEmpty(propertiesMustBeDefined)) {
    return [];
  }
  return arrayGetUnique(propertiesMustBeDefined).map((value) => {
    if (!isString(value)) {
      throw new TypeError(
        `'Defined' expect array of strings. Value: '${jsonStringify(value)}'.`,
      );
    }
    return value;
  });
}
