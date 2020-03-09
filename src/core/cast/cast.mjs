import castConfig from "./castConfig";
import castData from "./castData";
import isObjectEmpty from "../../util/check/isObjectEmpty";

/**
 * @name cast
 * @throws TypeError
 * @param {Object} data
 * @param {Object.<string, string>=} propertyToType
 * @returns {Object}
 */
export default function cast(data, propertyToType = {}) {
  const config = castConfig(propertyToType);
  if (isObjectEmpty(config)) {
    return data;
  }
  return castData(config, data);
}
