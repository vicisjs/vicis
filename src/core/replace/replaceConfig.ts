import { IReplace } from "../../interface/config/IReplace";

import { checkIsObjectLike } from "../../util/check/isObjectLike";

/**
 * @name replaceConfig
 * @throws TypeError
 * @param {Object.<string, *>} replacePropertyValues
 * @returns {Object}
 */
export function replaceConfig(replacePropertyValues: IReplace): IReplace {
  if (!checkIsObjectLike(replacePropertyValues)) {
    throw new TypeError("'Replace' should be an object");
  }
  return replacePropertyValues;
}
