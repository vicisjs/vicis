import isArrayEmpty from "../../util/check/isArrayEmpty";

/**
 * @name pickData
 * @param {Array.<string>} propertiesToPick
 * @param {Object} dataToSerialize
 * @returns {Object}
 */
export default function pickData(propertiesToPick, dataToSerialize) {
  if (isArrayEmpty(propertiesToPick)) {
    return dataToSerialize;
  }
  const newCache = {};
  Object.keys(dataToSerialize).forEach((key) => {
    if (propertiesToPick.includes(key)) {
      newCache[key] = dataToSerialize[key];
    }
  });
  return newCache;
}
