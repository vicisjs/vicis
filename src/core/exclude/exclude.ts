import { IExclude } from "../../interface/config/IExclude";
import { IObject } from "../../interface/common/IObject";

import { arrayIsEmpty } from "../../util/array/is/empty";
import { isRegExp } from "../../util/is/regexp";
import { isString } from "../../util/is/string";
import { objectGetKeys } from "../../util/object/get/keys";

import { excludeConfig } from "./excludeConfig";

/**
 * @name exclude
 * @throws TypeError
 * @param {Object} data
 * @param {Array.<string|RegExp>=} propertiesToExclude
 * @returns {Object}
 */
function exclude(
  data: IObject,
  propertiesToExclude: IExclude = [],
): IObject {
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
  const excludeRegExp = config.filter(isRegExp) as RegExp[];
  if (excludeRegExp.length) {
    excludeRegExp.forEach((reg: RegExp) => {
      Object.keys(data).forEach((key) => {
        if (reg.test(key)) {
          delete data[key];
        }
      });
    });
  }
  return data;
}

export { exclude };
