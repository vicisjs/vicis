import objectIsEmpty from "@corefunc/corefunc/object/is/empty.mjs";

import clone from "../../util/variable/clone";
import isFunction from "../../util/is/isFunction";

/**
 * @name transformData
 * @param {Object.<string, function>} propertyValueTransformWith
 * @param {Object} dataToSerialize
 * @returns {Object}
 */
export default function transformData(propertyValueTransformWith, dataToSerialize) {
  if (objectIsEmpty(propertyValueTransformWith)) {
    return dataToSerialize;
  }
  Object.keys(propertyValueTransformWith).forEach((key) => {
    if (!(key in dataToSerialize)) {
      throw new Error(`Field '${key}' suppose to be transformed.`);
    }
    if (isFunction(propertyValueTransformWith[key])) {
      dataToSerialize[key] = propertyValueTransformWith[key](dataToSerialize[key], key, clone(dataToSerialize));
    } else {
      // noinspection JSUnresolvedFunction
      dataToSerialize[key] = propertyValueTransformWith[key].toFunction()(
        dataToSerialize[key],
        key,
        clone(dataToSerialize),
      );
    }
  });
  return dataToSerialize;
}
