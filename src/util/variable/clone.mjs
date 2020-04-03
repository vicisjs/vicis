import checkIsPrimitive from "@corefunc/corefunc/check/isPrimitive.mjs";

import cloneDeep from "./cloneDeep.mjs";

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
