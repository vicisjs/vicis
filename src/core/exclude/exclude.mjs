import arrayIsEmpty from "@corefunc/corefunc/array/is/empty.mjs";
import isRegExp from "@corefunc/corefunc/is/regexp.mjs";
import isString from "@corefunc/corefunc/is/string.mjs";
import objectGetKeys from "@corefunc/corefunc/object/get/keys.mjs";

import excludeConfig from "./excludeConfig";

/**
 * @name exclude
 * @throws TypeError
 * @param {Object} data
 * @param {Array.<string|RegExp>=} propertiesToExclude
 * @returns {Object}
 */
export default function exclude(data, propertiesToExclude = []) {
  const config = excludeConfig(propertiesToExclude);
  if (arrayIsEmpty(config)) {
    return data;
  }
  const excludeString = config.filter(isString);
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
  const excludeRegExp = config.filter(isRegExp);
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
