import isObjectEmpty from "../../util/check/isObjectEmpty";

/**
 * @name defaultsData
 * @param {Object.<string, *>} propertyDefaultValues
 * @param {Object} dataToSerialize
 * @returns {Object}
 */
export default function defaultsData(propertyDefaultValues, dataToSerialize) {
  if (isObjectEmpty(propertyDefaultValues)) {
    return dataToSerialize;
  }
  Object.keys(propertyDefaultValues).forEach((key) => {
    if (!(key in dataToSerialize) || dataToSerialize[key] === undefined) {
      dataToSerialize[key] = propertyDefaultValues[key];
    }
  });
  return dataToSerialize;
}
