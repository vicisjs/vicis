import { IObject } from "../../interface/common/IObject";
import { IOmit } from "../../interface/config/IOmit";

import { arrayIsEmpty } from "../../util/array/is/empty";

/**
 * @name omitData
 * @param {Array.<string>} propertiesToOmit
 * @param {Object} data
 * @returns {Object}
 */
function omitData(propertiesToOmit: IOmit, data: IObject): IObject {
  if (arrayIsEmpty(propertiesToOmit)) {
    return data;
  }
  const dataToSerialize: IObject = {};
  Object.keys(data).forEach((key) => {
    if (propertiesToOmit.includes(key)) {
      return;
    }
    dataToSerialize[key] = data[key];
  });
  return dataToSerialize;
}

export { omitData };
