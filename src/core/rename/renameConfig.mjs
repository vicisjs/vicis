import arrayUnique from "../../util/array/unique";
import isObjectEmpty from "../../util/check/isObjectEmpty";
import isObjectLike from "../../util/check/isObjectLike";
import isString from "../../util/is/isString";
import jsonStringify from "../../util/json/stringify";

/**
 * @name renameConfig
 * @throws TypeError
 * @param {Object.<string, string>} renamePropertyFromTo
 * @returns {Object}
 */
export default function renameConfig(renamePropertyFromTo) {
  if (!isObjectLike(renamePropertyFromTo)) {
    throw new TypeError("'Rename' should be an object");
  }
  if (isObjectEmpty(renamePropertyFromTo)) {
    return {};
  }
  Object.keys(renamePropertyFromTo).forEach((key) => {
    if (!isString(key)) {
      throw new TypeError(`'Rename' expect object values to be strings. Not a string at key: '${key}'.`);
    }
  });
  const to = Object.values(renamePropertyFromTo);
  const toUnique = arrayUnique(to);
  if (to.length !== toUnique.length) {
    throw new TypeError(`'Rename' has similar values: '${jsonStringify(toUnique)}'.`);
  }
  return renamePropertyFromTo;
}
