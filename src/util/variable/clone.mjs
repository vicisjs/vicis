import isPrimitive from "@corefunc/corefunc/check/isPrimitive";

import cloneDeep from "./cloneDeep";

/**
 * @name clone
 * @param {*} value
 * @returns {*}
 */
export default function clone(value) {
  if (isPrimitive(value)) {
    return value;
  }
  return cloneDeep(value);
}
