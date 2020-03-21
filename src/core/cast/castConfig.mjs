import objectIsEmpty from "@corefunc/corefunc/object/is/empty.mjs";

import TYPES_LIST from "../../const/typesList";

import isObjectLike from "../../util/check/isObjectLike";
import isString from "../../util/is/isString";
import jsonStringify from "../../util/json/stringify";

/**
 * @name castConfig
 * @throws TypeError
 * @param {Object.<string, string>} propertyToType
 * @returns {Object}
 */
export default function castConfig(propertyToType) {
  if (!isObjectLike(propertyToType)) {
    throw new TypeError("Cast should be an object");
  }
  if (objectIsEmpty(propertyToType)) {
    return {};
  }
  Object.keys(propertyToType).forEach((key) => {
    if (!isString(propertyToType[key])) {
      throw new TypeError(
        `'Cast' expect object values to be strings. Not a string at key: '${jsonStringify(propertyToType[key])}'.`,
      );
    }
    if (!TYPES_LIST.includes(propertyToType[key])) {
      throw new TypeError(`'Cast' has unknown type in {${key}: "${propertyToType[key]}"}.`);
    }
  });
  return propertyToType;
}