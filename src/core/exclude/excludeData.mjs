import isArrayEmpty from "../../util/check/isArrayEmpty";
import isRegExp from "../../util/is/isRegExp";
import isString from "../../util/is/isString";
import objectKeys from "../../util/object/keys";

/**
 * @name excludeData
 * @param {Array.<string|RegExp>} propertiesToExclude
 * @param {Object} data
 * @returns {Object}
 */
export default function excludeData(propertiesToExclude, data) {
  if (isArrayEmpty(propertiesToExclude)) {
    return data;
  }
  const excludeString = propertiesToExclude.filter(isString);
  if (excludeString.length) {
    Object.keys(data).forEach((key) => {
      if (excludeString.includes(key)) {
        delete data[key];
      }
    });
  }
  const keys = objectKeys(data);
  if (keys.length === 0) {
    return data;
  }
  const excludeRegExp = propertiesToExclude.filter(isRegExp);
  if (excludeRegExp.length) {
    excludeRegExp.forEach((reg) => {
      Object.keys(data).forEach((key) => {
        if (reg.test(key)) {
          delete data[key];
        }
      });
    });
  }
  return data;
}
