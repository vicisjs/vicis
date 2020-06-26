import { IDefaults } from "../../interface/config/IDefaults";

import { checkIsObjectLike } from "../../util/check/isObjectLike";

/**
 * @name defaultsConfig
 * @throws TypeError
 * @param {Object.<string, *>} propertyDefaultValues
 * @returns {Object}
 */
function defaultsConfig(propertyDefaultValues: IDefaults): IDefaults {
  if (!checkIsObjectLike(propertyDefaultValues)) {
    throw new TypeError("'Defaults' should be an object");
  }
  return propertyDefaultValues;
}

export { defaultsConfig };
