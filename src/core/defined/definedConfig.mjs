import arrayUnique from "../../util/array/unique";
import isArrayEmpty from "../../util/check/isArrayEmpty";
import isString from "../../util/is/isString";
import jsonStringify from "../../util/json/stringify";

/**
 * @name definedConfig
 * @throws TypeError
 * @param {Array.<string>} propertiesMustBeDefined
 * @returns {Array.<string>}
 */
export default function definedConfig(propertiesMustBeDefined) {
  if (!Array.isArray(propertiesMustBeDefined)) {
    throw new TypeError("'Defined' should be an array");
  }
  if (isArrayEmpty(propertiesMustBeDefined)) {
    return [];
  }
  return arrayUnique(propertiesMustBeDefined).map((value) => {
    if (!isString(value)) {
      throw new TypeError(`'Defined' expect array of strings. Value: '${jsonStringify(value)}'.`);
    }
    return value;
  });
}
