import objectIsEmpty from "@corefunc/corefunc/object/is/empty";

/**
 * @name replaceData
 * @param {Object.<string, *>} replacePropertyValues
 * @param {Object} dataToSerialize
 * @returns {Object}
 */
export default function replaceData(replacePropertyValues, dataToSerialize) {
  if (objectIsEmpty(replacePropertyValues)) {
    return dataToSerialize;
  }
  Object.keys(replacePropertyValues).forEach((key) => {
    dataToSerialize[key] = replacePropertyValues[key];
  });
  return dataToSerialize;
}
