import arrayIsEmpty from "@corefunc/corefunc/array/is/empty.mjs";

import definedData from "./definedData.mjs";

/**
 * @name defined
 * @throws TypeError
 * @param {Object} data
 * @param {Array.<string>=} propertiesMustBeDefined
 * @returns {Object}
 */
export default function defined(data, propertiesMustBeDefined = []) {
  if (arrayIsEmpty(propertiesMustBeDefined)) {
    return data;
  }
  return definedData(propertiesMustBeDefined, data);
}
