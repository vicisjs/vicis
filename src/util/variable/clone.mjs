import cloneDeep from "./cloneDeep";
import isPrimitive from "../check/isPrimitive";

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
