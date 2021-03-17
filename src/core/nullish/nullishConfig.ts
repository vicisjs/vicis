import { INullish } from "../../interface/config/INullish";

import { checkIsObjectLike } from "../../util/check/isObjectLike";

/**
 * @name nullishConfig
 * @throws TypeError
 * @param {Object.<string, *>} propertyNullishValues
 * @returns {Object}
 */
export function nullishConfig(propertyNullishValues: INullish): INullish {
  if (!checkIsObjectLike(propertyNullishValues)) {
    throw new TypeError("'Defaults' should be an object");
  }
  return propertyNullishValues;
}
