import arrayUnique from "../../util/array/unique";
import isArrayEmpty from "../../util/check/isArrayEmpty";
import isString from "../../util/is/isString";
import jsonStringify from "../../util/json/stringify";

/**
 * @name pickConfig
 * @throws TypeError
 * @param {Array.<string>} propertiesToPick
 * @returns {Array.<string>}
 */
export default function pickConfig(propertiesToPick) {
  if (!Array.isArray(propertiesToPick)) {
    throw new TypeError("'Pick' should be an array");
  }
  if (isArrayEmpty(propertiesToPick)) {
    return [];
  }
  return arrayUnique(propertiesToPick).map((value) => {
    if (!isString(value)) {
      throw new TypeError(`'Pick' expect array of strings. Value: '${jsonStringify(value)}'.`);
    }
    return value;
  });
}
