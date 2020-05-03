import checkIsPrimitive from "@corefunc/corefunc/check/isPrimitive";

import cloneDeep from "./cloneDeep";

/**
 * @name clone
 * @param {*} value
 * @returns {*}
 */
export default function clone(value) {
  if (checkIsPrimitive(value)) {
    return value;
  }
  return cloneDeep(value);
}
