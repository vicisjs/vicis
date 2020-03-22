import checkIsCallable from "@corefunc/corefunc/check/isCallable.mjs";
import checkIsObjectLike from "@corefunc/corefunc/check/isObjectLike.mjs";
import objectIsEmpty from "@corefunc/corefunc/object/is/empty.mjs";

/**
 * @name transformConfig
 * @throws TypeError
 * @param {Object.<string, function>} propertyValueTransformWith
 * @returns {Object}
 */
export default function transformConfig(propertyValueTransformWith) {
  if (!checkIsObjectLike(propertyValueTransformWith)) {
    throw new TypeError("'Transform' should be an object");
  }
  if (objectIsEmpty(propertyValueTransformWith)) {
    return {};
  }
  Object.keys(propertyValueTransformWith).forEach((key) => {
    if (!checkIsCallable(propertyValueTransformWith[key])) {
      throw new TypeError(`'Transform' expect object values to be functions. Not a function at key: '${key}'.`);
    }
  });
  return propertyValueTransformWith;
}
