/**
 * @name isCallable
 * @param {*} value
 * @returns {boolean}
 */
import isFunction from "./isFunction.mjs";

export default function isCallable(value) {
  if (!value) {
    return false;
  }
  if (isFunction(value)) {
    return true;
  }
  if (
    typeof value === "object" &&
    "toFunction" in value &&
    isFunction(value.toFunction) &&
    isFunction(value.toFunction())
  ) {
    return true;
  }
  return false;
}
