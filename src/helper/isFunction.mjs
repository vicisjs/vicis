/**
 * @name isFunction
 * @param {*} value
 * @returns {boolean}
 */
export function isFunction(value) {
  return Object.prototype.toString.call(value) === "[object Function]";
}
