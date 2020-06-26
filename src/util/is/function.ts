/**
 * @param {*} value
 * @returns {boolean}
 */
function isFunction(value: any): boolean {
  if (Object.prototype.toString.call(value) !== "[object Function]") {
    return false;
  }
  return !/^class\s/.test(Function.prototype.toString.call(value));
}

export { isFunction };
