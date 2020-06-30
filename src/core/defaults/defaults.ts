import { IObject } from "../../interface/common/IObject";

import { objectIsEmpty } from "../../util/object/is/empty";

import { defaultsConfig } from "./defaultsConfig";
import { defaultsData } from "./defaultsData";
import { IDefaults } from "../../interface/config/IDefaults";

/**
 * @name defaults
 * @throws TypeError
 * @param {Object} data
 * @param {Object.<string, *>=} propertyDefaultValues
 * @returns {Object}
 */
export function defaults(
  data: IObject,
  propertyDefaultValues: IDefaults = {},
): IObject {
  const config = defaultsConfig(propertyDefaultValues);
  if (objectIsEmpty(config)) {
    return data;
  }
  return defaultsData(propertyDefaultValues, data);
}
