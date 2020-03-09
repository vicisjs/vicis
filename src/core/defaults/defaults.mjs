import defaultsConfig from "./defaultsConfig";
import defaultsData from "./defaultsData";
import isObjectEmpty from "../../util/check/isObjectEmpty";

/**
 * @name defaults
 * @throws TypeError
 * @param {Object} data
 * @param {Object.<string, *>=} propertyDefaultValues
 * @returns {Object}
 */
export default function defaults(data, propertyDefaultValues = {}) {
  const config = defaultsConfig(propertyDefaultValues);
  if (isObjectEmpty(config)) {
    return data;
  }
  return defaultsData(propertyDefaultValues, data);
}
