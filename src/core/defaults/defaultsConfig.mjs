import isObjectLike from "../../util/check/isObjectLike";

/**
 * @name defaultsConfig
 * @throws TypeError
 * @param {Object.<string, *>} propertyDefaultValues
 * @returns {Object}
 */
export default function defaultsConfig(propertyDefaultValues) {
  if (!isObjectLike(propertyDefaultValues)) {
    throw new TypeError("'Defaults' should be an object");
  }
  return propertyDefaultValues;
}
