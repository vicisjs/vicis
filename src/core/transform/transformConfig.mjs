import objectIsEmpty from "@corefunc/corefunc/object/is/empty.mjs";

import isCallable from "../../util/is/isCallable";
import isObjectLike from "../../util/check/isObjectLike";

/**
 * @name transformConfig
 * @throws TypeError
 * @param {Object.<string, function>} propertyValueTransformWith
 * @returns {Object}
 */
export default function transformConfig(propertyValueTransformWith) {
  if (!isObjectLike(propertyValueTransformWith)) {
    throw new TypeError("'Transform' should be an object");
  }
  if (objectIsEmpty(propertyValueTransformWith)) {
    return {};
  }
  Object.keys(propertyValueTransformWith).forEach((key) => {
    if (!isCallable(propertyValueTransformWith[key])) {
      throw new TypeError(`'Transform' expect object values to be functions. Not a function at key: '${key}'.`);
    }
  });
  return propertyValueTransformWith;
}
