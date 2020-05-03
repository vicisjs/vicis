import objectIsEmpty from "@corefunc/corefunc/object/is/empty";

/**
 * @name renameData
 * @param {Object.<string, string>} renamePropertyFromTo
 * @param {Object} dataToSerialize
 * @returns {Object}
 */
export default function renameData(renamePropertyFromTo, dataToSerialize) {
  if (objectIsEmpty(renamePropertyFromTo)) {
    return dataToSerialize;
  }
  const renameFrom = Object.keys(renamePropertyFromTo).sort((alpha, beta) => alpha.localeCompare(beta));
  const renamedData = {};
  renameFrom.forEach((key) => {
    if (!(key in dataToSerialize)) {
      throw new Error(`Field '${key}' suppose to be renamed.`);
    }
    renamedData[renamePropertyFromTo[key]] = dataToSerialize[key];
  });
  renameFrom.forEach((key) => {
    delete dataToSerialize[key];
  });
  Object.assign(dataToSerialize, renamedData);
  return dataToSerialize;
}
