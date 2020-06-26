import { IObject } from "../../interface/common/IObject";
import { IRequired } from "../../interface/config/IRequired";

import { arrayIsEmpty } from "../../util/array/is/empty";

/**
 * @name requiredData
 * @param {Array.<string>} propertiesRequired
 * @param {Object} dataToSerialize
 * @returns {Object}
 */

function requiredData(
  propertiesRequired: IRequired,
  dataToSerialize: IObject,
): IObject {
  if (arrayIsEmpty(propertiesRequired)) {
    return dataToSerialize;
  }
  propertiesRequired.forEach((key) => {
    if (!(key in dataToSerialize)) {
      throw new Error(`Field '${key}' is required.`);
    }
  });
  return dataToSerialize;
}

export { requiredData };
