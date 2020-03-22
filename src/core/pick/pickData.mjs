import arrayIsEmpty from "@corefunc/corefunc/array/is/empty.mjs";

/**
 * @name pickData
 * @param {Array.<string>} propertiesToPick
 * @param {Object} dataToSerialize
 * @returns {Object}
 */
export default function pickData(propertiesToPick, dataToSerialize) {
  if (arrayIsEmpty(propertiesToPick)) {
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
