import { IObject } from "../../interface/common/IObject";

import { objectIsEmpty } from "../../util/object/is/empty";

import { nullishConfig } from "./nullishConfig";
import { nullishData } from "./nullishData";
import { INullish } from "../../interface/config/INullish";

/**
 * @name nullish
 * @throws TypeError
 * @param {Object} data
 * @param {Object.<string, *>=} propertyNullishValues
 * @returns {Object}
 */
export function nullish(
  data: IObject,
  propertyNullishValues: INullish = {},
): IObject {
  const config = nullishConfig(propertyNullishValues);
  if (objectIsEmpty(config)) {
    return data;
  }
  return nullishData(propertyNullishValues, data);
}
