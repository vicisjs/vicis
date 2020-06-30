import { IObject } from "../../interface/common/IObject";
import { IRequired } from "../../interface/config/IRequired";

import { arrayIsEmpty } from "../../util/array/is/empty";

import { requiredConfig } from "./requiredConfig";
import { requiredData } from "./requiredData";

/**
 * @name required
 * @throws TypeError
 * @param {Object} data
 * @param {Array.<string>=} propertiesRequired
 * @returns {Object}
 */
export function required(
  data: IObject,
  propertiesRequired: IRequired = [],
): IObject {
  const config = requiredConfig(propertiesRequired);
  if (arrayIsEmpty(config)) {
    return data;
  }
  return requiredData(config, data);
}
