import { IObject } from "../../interface/common/IObject";
import { IPick } from "../../interface/config/IPick";

import { arrayIsEmpty } from "../../util/array/is/empty";

import { pickConfig } from "./pickConfig";
import { pickData } from "./pickData";

/**
 * @name pick
 * @throws TypeError
 * @param {Object} data
 * @param {Array.<string>=} propertiesToPick
 * @returns {Object}
 */
function pick(data: IObject, propertiesToPick: IPick = []): IObject {
  const config = pickConfig(propertiesToPick);
  if (arrayIsEmpty(config)) {
    return data;
  }
  return pickData(config, data);
}

export { pick };
