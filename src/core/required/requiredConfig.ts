import { IRequired } from "../../interface/config/IRequired";

import { arrayGetUnique } from "../../util/array/get/unique";
import { arrayIsEmpty } from "../../util/array/is/empty";
import { isString } from "../../util/is/string";
import { jsonStringify } from "../../util/json/stringify";

/**
 * @name requiredConfig
 * @throws TypeError
 * @param {Array.<string>} propertiesRequired
 * @returns {Array.<string>}
 */
export function requiredConfig(propertiesRequired: IRequired = []): IRequired {
  if (!Array.isArray(propertiesRequired)) {
    throw new TypeError("'Required' should be an array");
  }
  if (arrayIsEmpty(propertiesRequired)) {
    return [];
  }
  return arrayGetUnique(propertiesRequired).map((value) => {
    if (!isString(value)) {
      throw new TypeError(
        `'Required' expect array of strings. Value: '${jsonStringify(value)}'.`,
      );
    }
    return value;
  });
}
