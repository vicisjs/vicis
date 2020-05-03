import checkIsObjectLike from "@corefunc/corefunc/check/isObjectLike";

/**
 * @name defaultsConfig
 * @throws TypeError
 * @param {Object.<string, *>} propertyDefaultValues
 * @returns {Object}
 */
export default function defaultsConfig(propertyDefaultValues) {
  if (!checkIsObjectLike(propertyDefaultValues)) {
    throw new TypeError("'Defaults' should be an object");
  }
  return propertyDefaultValues;
}
