import cloneDeep from "lodash.clonedeep";

/**
 * @name clone
 * @param {*} value
 * @returns {*}
 */
export function clone(value) {
  return cloneDeep(value);
}
