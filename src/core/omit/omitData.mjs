import arrayIsEmpty from "@corefunc/corefunc/array/is/empty";

/**
 * @name omitData
 * @param {Array.<string>} propertiesToOmit
 * @param {Object} data
 * @returns {Object}
 */
export default function omitData(propertiesToOmit, data) {
  if (arrayIsEmpty(propertiesToOmit)) {
    return data;
  }
  const dataToSerialize = {};
  Object.keys(data).forEach((key) => {
    if (propertiesToOmit.includes(key)) {
      return;
    }
    dataToSerialize[key] = data[key];
  });
  return dataToSerialize;
}
