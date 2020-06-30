/**
 * @param {*} value
 * @returns {boolean}
 */
export function isRegExp(value: any): boolean {
  return value instanceof RegExp;
}
