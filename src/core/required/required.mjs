import arrayIsEmpty from "@corefunc/corefunc/array/is/empty";

import requiredConfig from "./requiredConfig";
import requiredData from "./requiredData";

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
