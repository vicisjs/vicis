import { isObjectLike } from "./isObjectLike.mjs";
import { objectKeys } from "./objectKeys.mjs";

/**
 * @name collectionSortKeys
 * @param {*} value
 * @param {boolean=true} isDeep
 * @returns {*}
 */
export function collectionSortKeys(value, isDeep = true) {
  if (!isObjectLike(value)) {
    return value;
  }
  const keys = objectKeys(value);
  if (!keys.length) {
    return value;
  }
  return keys.reduce((sorted, key) => {
    if (isDeep && isObjectLike(value[key])) {
      sorted[key] = collectionSortKeys(value[key], isDeep);
    } else {
      sorted[key] = value[key];
    }
    return sorted;
  }, {});
}
