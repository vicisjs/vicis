import isArrayEmpty from "../../util/check/isArrayEmpty";
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
  if (isArrayEmpty(config)) {
    return data;
  }
  return requiredData(config, data);
}
