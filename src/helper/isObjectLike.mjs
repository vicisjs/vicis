/**
 * name isObjectLike
 * @param {*} value
 * @returns {boolean}
 */
export function isObjectLike(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
