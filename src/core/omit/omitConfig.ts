import { IOmit } from "../../interface/config/IOmit";

import { arrayGetUnique } from "../../util/array/get/unique";
import { arrayIsEmpty } from "../../util/array/is/empty";
import { isString } from "../../util/is/string";
import { jsonStringify } from "../../util/json/stringify";

/**
 * @name omitConfig
 * @throws TypeError
 * @param {Array.<string>} propertiesToOmit
 * @returns {Array.<string>}
 */
export function omitConfig(propertiesToOmit: IOmit): IOmit {
  if (!Array.isArray(propertiesToOmit)) {
    throw new TypeError("'Omit' should be an array");
  }
  if (arrayIsEmpty(propertiesToOmit)) {
    return [];
  }
  return arrayGetUnique(propertiesToOmit).map((value) => {
    if (!isString(value)) {
      throw new TypeError(
        `'Omit' expect array of strings. Value: '${jsonStringify(value)}'.`,
      );
    }
    return value;
  });
}
