import arrayIsEmpty from "@corefunc/corefunc/array/is/empty";
import isRegExp from "@corefunc/corefunc/is/regexp";
import isString from "@corefunc/corefunc/is/string";
import objectGetKeys from "@corefunc/corefunc/object/get/keys";

/**
 * @name excludeData
 * @param {Array.<string|RegExp>} propertiesToExclude
 * @param {Object} data
 * @returns {Object}
 */
export default function excludeData(propertiesToExclude, data) {
  if (arrayIsEmpty(propertiesToExclude)) {
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
  const keys = objectGetKeys(data);
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
