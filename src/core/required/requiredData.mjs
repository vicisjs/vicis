import isArrayEmpty from "../../util/check/isArrayEmpty";

/**
 * @name requiredData
 * @param {Array.<string>} propertiesRequired
 * @param {Object} dataToSerialize
 * @returns {Object}
 */
export default function requiredData(propertiesRequired, dataToSerialize) {
  if (isArrayEmpty(propertiesRequired)) {
    return dataToSerialize;
  }
  propertiesRequired.forEach((key) => {
    if (!(key in dataToSerialize)) {
      throw new Error(`Field '${key}' is required.`);
    }
  });
  return dataToSerialize;
}
