import { IObject } from "../../interface/common/IObject";
import { IPick } from "../../interface/config/IPick";

import { arrayIsEmpty } from "../../util/array/is/empty";

/**
 * @name pickData
 * @param {Array.<string>} propertiesToPick
 * @param {Object} dataToSerialize
 * @returns {Object}
 */

function pickData(
  propertiesToPick: IPick,
  dataToSerialize: IObject,
): IObject {
  if (arrayIsEmpty(propertiesToPick)) {
    return dataToSerialize;
  }
  const newCache: IObject = {};
  Object.keys(dataToSerialize).forEach((key) => {
    if (propertiesToPick.includes(key)) {
      newCache[key] = dataToSerialize[key];
    }
  });
  return newCache;
}

export { pickData };
