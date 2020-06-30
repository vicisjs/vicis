import { ITransform } from "../../interface/config/ITransform";

import { checkIsCallable } from "../../util/check/isCallable";
import { checkIsObjectLike } from "../../util/check/isObjectLike";
import { objectIsEmpty } from "../../util/object/is/empty";

/**
 * @name transformConfig
 * @throws TypeError
 * @param {Object.<string, function>} propertyValueTransformWith
 * @returns {Object}
 */
export function transformConfig(
  propertyValueTransformWith: ITransform,
): ITransform {
  if (!checkIsObjectLike(propertyValueTransformWith)) {
    throw new TypeError("'Transform' should be an object");
  }
  if (objectIsEmpty(propertyValueTransformWith)) {
    return {};
  }
  Object.keys(propertyValueTransformWith).forEach((key) => {
    if (!checkIsCallable(propertyValueTransformWith[key])) {
      throw new TypeError(
        `'Transform' expect object values to be functions. Not a function at key: '${key}'.`,
      );
    }
  });
  return propertyValueTransformWith;
}
