import arrayGetUnique from "@corefunc/corefunc/array/get/unique";
import arrayIsEmpty from "@corefunc/corefunc/array/is/empty";
import isString from "@corefunc/corefunc/is/string";

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
  if (arrayIsEmpty(propertiesToPick)) {
    return [];
  }
  return arrayGetUnique(propertiesToPick).map((value) => {
    if (!isString(value)) {
      throw new TypeError(`'Pick' expect array of strings. Value: '${jsonStringify(value)}'.`);
    }
    return value;
  });
}
