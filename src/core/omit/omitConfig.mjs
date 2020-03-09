import arrayUnique from "../../util/array/unique";
import isArrayEmpty from "../../util/check/isArrayEmpty";
import isString from "../../util/is/isString";
import jsonStringify from "../../util/json/stringify";

/**
 * @name omitConfig
 * @throws TypeError
 * @param {Array.<string>} propertiesToOmit
 * @returns {Array.<string>}
 */
export default function omitConfig(propertiesToOmit) {
  if (!Array.isArray(propertiesToOmit)) {
    throw new TypeError("'Omit' should be an array");
  }
  if (isArrayEmpty(propertiesToOmit)) {
    return [];
  }
  return arrayUnique(propertiesToOmit).map((value) => {
    if (!isString(value)) {
      throw new TypeError(`'Omit' expect array of strings. Value: '${jsonStringify(value)}'.`);
    }
    return value;
  });
}
