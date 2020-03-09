/**
 * @name isFunction
 * @param {*} value
 * @returns {boolean}
 */
export default function isFunction(value) {
  return Object.prototype.toString.call(value) === "[object Function]";
}
