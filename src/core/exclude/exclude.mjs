import excludeConfig from "./excludeConfig";
import isArrayEmpty from "../../util/check/isArrayEmpty";
import isRegExp from "../../util/is/isRegExp";
import isString from "../../util/is/isString";
import objectKeys from "../../util/object/keys";

/**
 * @name exclude
 * @throws TypeError
 * @param {Object} data
 * @param {Array.<string|RegExp>=} propertiesToExclude
 * @returns {Object}
 */
export default function exclude(data, propertiesToExclude = []) {
  const config = excludeConfig(propertiesToExclude);
  if (isArrayEmpty(config)) {
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
  const keys = objectKeys(data);
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
