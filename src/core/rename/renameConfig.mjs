import arrayGetUnique from "@corefunc/corefunc/array/get/unique.mjs";
import checkIsObjectLike from "@corefunc/corefunc/check/isObjectLike.mjs";
import objectIsEmpty from "@corefunc/corefunc/object/is/empty.mjs";
import isString from "@corefunc/corefunc/is/string.mjs";

import jsonStringify from "../../util/json/stringify.mjs";

/**
 * @name renameConfig
 * @throws TypeError
 * @param {Object.<string, string>} renamePropertyFromTo
 * @returns {Object}
 */
export default function renameConfig(renamePropertyFromTo) {
  if (!checkIsObjectLike(renamePropertyFromTo)) {
    throw new TypeError("'Rename' should be an object");
  }
  if (objectIsEmpty(renamePropertyFromTo)) {
    return {};
  }
  Object.keys(renamePropertyFromTo).forEach((key) => {
    if (!isString(key)) {
      throw new TypeError(`'Rename' expect object values to be strings. Not a string at key: '${key}'.`);
    }
  });
  const to = Object.values(renamePropertyFromTo);
  const toUnique = arrayGetUnique(to);
  if (to.length !== toUnique.length) {
    throw new TypeError(`'Rename' has similar values: '${jsonStringify(toUnique)}'.`);
  }
  return renamePropertyFromTo;
}
