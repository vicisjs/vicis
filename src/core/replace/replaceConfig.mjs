import isObjectLike from "../../util/check/isObjectLike";

/**
 * @name replaceConfig
 * @throws TypeError
 * @param {Object.<string, *>} replacePropertyValues
 * @returns {Object}
 */
export default function replaceConfig(replacePropertyValues) {
  if (!isObjectLike(replacePropertyValues)) {
    throw new TypeError("'Replace' should be an object");
  }
  return replacePropertyValues;
}
