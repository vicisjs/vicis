/**
 * @param {*} value
 * @returns {boolean}
 */
function isRegExp(value: any): boolean {
  return value instanceof RegExp;
}

export { isRegExp };
