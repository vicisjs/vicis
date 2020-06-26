import { IObject } from "../../interface/common/IObject";
import { IOmit } from "../../interface/config/IOmit";

import { arrayIsEmpty } from "../../util/array/is/empty";

import { omitConfig } from "./omitConfig";

/**
 * @name omit
 * @throws TypeError
 * @param {Object} data
 * @param {Array.<string>=} propertiesToOmit
 * @returns {Object}
 */
function omit(data: IObject, propertiesToOmit: IOmit = []): IObject {
  const config = omitConfig(propertiesToOmit);
  if (arrayIsEmpty(config)) {
    return data;
  }
  const dataToSerialize: IObject = {};
  Object.keys(data).forEach((key) => {
    if (config.includes(key)) {
      return;
    }
    dataToSerialize[key] = data[key];
  });
  return dataToSerialize;
}

export { omit };
