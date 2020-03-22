import checkIsObjectLike from "@corefunc/corefunc/check/isObjectLike.mjs";

/**
 * @name replaceConfig
 * @throws TypeError
 * @param {Object.<string, *>} replacePropertyValues
 * @returns {Object}
 */
export default function replaceConfig(replacePropertyValues) {
  if (!checkIsObjectLike(replacePropertyValues)) {
    throw new TypeError("'Replace' should be an object");
  }
  return replacePropertyValues;
}
