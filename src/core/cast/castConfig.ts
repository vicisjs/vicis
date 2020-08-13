import { ICast } from "../../interface/config/ICast";

import { ECastType } from "../../const/ECastType";

import { checkIsObjectLike } from "../../util/check/isObjectLike";
import { isString } from "../../util/is/string";
import { jsonStringify } from "../../util/json/stringify";
import { objectIsEmpty } from "../../util/object/is/empty";

/**
 * @name castConfig
 * @throws TypeError
 * @param {Object.<string, string>} propertyToType
 * @returns {Object}
 */
export function castConfig(propertyToType: ICast): ICast {
  if (!checkIsObjectLike(propertyToType)) {
    throw new TypeError("Cast should be an object");
  }
  if (objectIsEmpty(propertyToType)) {
    return {};
  }
  Object.keys(propertyToType).forEach((key) => {
    if (!isString(propertyToType[key])) {
      throw new TypeError(
        `'Cast' expect object values to be strings. Not a string at key: '${
          jsonStringify(propertyToType[key])
        }'.`,
      );
    }
    if (!Object.values(ECastType as {[key: string]: string }).includes(propertyToType[key])) {
      throw new TypeError(
        `'Cast' has unknown type in {${key}: "${propertyToType[key]}"}.`,
      );
    }
  });
  return propertyToType;
}
