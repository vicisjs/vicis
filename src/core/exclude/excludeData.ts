import { IExclude } from "../../interface/config/IExclude";
import { IObject } from "../../interface/common/IObject";

import { arrayIsEmpty } from "../../util/array/is/empty";
import { isRegExp } from "../../util/is/regexp";
import { isString } from "../../util/is/string";
import { objectGetKeys } from "../../util/object/get/keys";

/**
 * @name excludeData
 * @param {Array.<string|RegExp>} propertiesToExclude
 * @param {Object} data
 * @returns {Object}
 */
export function excludeData(
  propertiesToExclude: IExclude,
  data: IObject,
): IObject {
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
  const excludeRegExp = propertiesToExclude.filter(isRegExp) as RegExp[];
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
