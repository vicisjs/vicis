import { IObject } from "../../interface/common/IObject";
import { IReplace } from "../../interface/config/IReplace";

import { objectIsEmpty } from "../../util/object/is/empty";

/**
 * @name replaceData
 * @param {Object.<string, *>} replacePropertyValues
 * @param {Object} dataToSerialize
 * @returns {Object}
 */
export function replaceData(
  replacePropertyValues: IReplace,
  dataToSerialize: IObject,
): IObject {
  if (objectIsEmpty(replacePropertyValues)) {
    return dataToSerialize;
  }
  Object.keys(replacePropertyValues).forEach((key) => {
    dataToSerialize[key] = replacePropertyValues[key];
  });
  return dataToSerialize;
}
