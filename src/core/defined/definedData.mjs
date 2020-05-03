import arrayIsEmpty from "@corefunc/corefunc/array/is/empty";

import definedConfig from "./definedConfig";

/**
 * @name definedData
 * @throws TypeError
 * @param {Array.<string>} propertiesMustBeDefined
 * @param {Object} dataToSerialize
 * @returns {Object}
 */
export default function definedData(propertiesMustBeDefined, dataToSerialize) {
  const config = definedConfig(propertiesMustBeDefined);
  if (arrayIsEmpty(config)) {
    return dataToSerialize;
  }
  config.forEach((key) => {
    if (!(key in dataToSerialize)) {
      throw new Error(`Field '${key}' must be defined.`);
    }
    if (dataToSerialize[key] === undefined) {
      throw new Error(`Field '${key}' should have value.`);
    }
  });
  return dataToSerialize;
}
