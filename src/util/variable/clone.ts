import { checkIsPrimitive } from "../check/isPrimitive";
import { cloneDeep } from "./cloneDeep";

/**
 * @name clone
 * @param {*} value
 * @returns {*}
 */
export function clone<T extends any>(value: T): T {
  if (checkIsPrimitive(value)) {
    return value;
  }
  return cloneDeep(value);
}
