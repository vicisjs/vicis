import { isObjectLike } from "../helper/isObjectLike";
import { isString } from "../helper/isString";

const TYPES_LIST = ["boolean", "numeric", "integer", "string", "json"];

/**
 * @name cast
 * @throws TypeError
 * @param {Object<String, String>} propToType
 * @return {Object<String, String>}
 */
export function cast(propToType = {}) {
  if (!isObjectLike(propToType)) {
    throw new TypeError("Cast should be an object");
  }
  const newConfig = {};
  Object.keys(propToType).forEach((key) => {
    if (!isString(propToType[key])) {
      throw new TypeError(`Cast expect object values to be strings. Not a string at key: '${propToType[key]}'.`);
    }
    if (!TYPES_LIST.includes(propToType[key])) {
      throw new TypeError(`Cast has unknown type in {${key}: "${propToType[key]}"}.`);
    }
    newConfig[key] = propToType[key];
  });
  return newConfig;
}
