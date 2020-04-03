import arrayIsEmpty from "@corefunc/corefunc/array/is/empty.mjs";

import requiredConfig from "./requiredConfig.mjs";
import requiredData from "./requiredData.mjs";

/**
 * @name required
 * @throws TypeError
 * @param {Object} data
 * @param {Array.<string>=} propertiesRequired
 * @returns {Object}
 */
export default function required(data, propertiesRequired = []) {
  const config = requiredConfig(propertiesRequired);
  if (arrayIsEmpty(config)) {
    return data;
  }
  return requiredData(config, data);
}
