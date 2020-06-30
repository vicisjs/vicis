/**
 * @name checkIsObjectLike
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example isObjectLike({}); ➜ true
 * @example isObjectLike([1, 2, 3]); ➜ true
 * @example isObjectLike(() => {}); ➜ false
 * @example isObjectLike(null); ➜ false
 */
export function checkIsObjectLike(value: any): boolean {
  return value && typeof value === "object" && !Array.isArray(value);
}
