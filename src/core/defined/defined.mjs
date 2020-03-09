import isArrayEmpty from "../../util/check/isArrayEmpty";
import definedData from "./definedData";

/**
 * @name defined
 * @throws TypeError
 * @param {Object} data
 * @param {Array.<string>=} propertiesMustBeDefined
 * @returns {Object}
 */
export default function defined(data, propertiesMustBeDefined = []) {
  if (isArrayEmpty(propertiesMustBeDefined)) {
    return data;
  }
  return definedData(propertiesMustBeDefined, data);
}
