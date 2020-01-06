import { collectionSortKeys } from "./collectionSortKeys.mjs";

/**
 * @name castToJson
 * @param {*} value
 * @param {boolean=true} sort
 * @returns {*}
 */
export function castToJson(value, sort = true) {
  if (sort) {
    return collectionSortKeys(JSON.parse(JSON.stringify(value)), true);
  } else {
    return JSON.parse(JSON.stringify(value));
  }
}
