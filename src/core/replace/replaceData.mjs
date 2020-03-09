import isObjectEmpty from "../../util/check/isObjectEmpty";

/**
 * @name replaceData
 * @param {Object.<string, *>} replacePropertyValues
 * @param {Object} dataToSerialize
 * @returns {Object}
 */
export default function replaceData(replacePropertyValues, dataToSerialize) {
  if (isObjectEmpty(replacePropertyValues)) {
    return dataToSerialize;
  }
  Object.keys(replacePropertyValues).forEach((key) => {
    dataToSerialize[key] = replacePropertyValues[key];
  });
  return dataToSerialize;
}
