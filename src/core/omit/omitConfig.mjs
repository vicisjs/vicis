import arrayGetUnique from "@corefunc/corefunc/array/get/unique.mjs";
import arrayIsEmpty from "@corefunc/corefunc/array/is/empty.mjs";
import isString from "@corefunc/corefunc/is/string.mjs";

import jsonStringify from "../../util/json/stringify.mjs";

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
  if (arrayIsEmpty(propertiesToOmit)) {
    return [];
  }
  return arrayGetUnique(propertiesToOmit).map((value) => {
    if (!isString(value)) {
      throw new TypeError(`'Omit' expect array of strings. Value: '${jsonStringify(value)}'.`);
    }
    return value;
  });
}
