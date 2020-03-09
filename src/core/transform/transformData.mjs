import clone from "../../util/variable/clone";
import isObjectEmpty from "../../util/check/isObjectEmpty";

/**
 * @name transformData
 * @param {Object.<string, function>} propertyValueTransformWith
 * @param {Object} dataToSerialize
 * @returns {Object}
 */
export default function transformData(propertyValueTransformWith, dataToSerialize) {
  if (isObjectEmpty(propertyValueTransformWith)) {
    return dataToSerialize;
  }
  Object.keys(propertyValueTransformWith).forEach((key) => {
    if (!(key in dataToSerialize)) {
      throw new Error(`Field '${key}' suppose to be transformed.`);
    }
    dataToSerialize[key] = propertyValueTransformWith[key](dataToSerialize[key], key, clone(dataToSerialize));
  });
  return dataToSerialize;
}
