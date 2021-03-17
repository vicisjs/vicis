import { IObject } from "../../interface/common/IObject";

import { objectIsEmpty } from "../../util/object/is/empty";

/**
 * @name nullishData
 * @param {Object.<string, *>} propertyNullishValues
 * @param {Object} dataToSerialize
 * @returns {Object}
 */
export function nullishData(propertyNullishValues: IObject, dataToSerialize: IObject): IObject {
  if (objectIsEmpty(propertyNullishValues)) {
    return dataToSerialize;
  }
  Object.keys(propertyNullishValues).forEach((key) => {
    if (!(key in dataToSerialize) || dataToSerialize[key] === undefined || dataToSerialize[key] === null) {
      dataToSerialize[key] = propertyNullishValues[key];
    }
  });
  return dataToSerialize;
}
