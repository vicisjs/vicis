import { IObject } from "../../interface/common/IObject";
import { ITransform } from "../../interface/config/ITransform";

import { objectIsEmpty } from "../../util/object/is/empty";

import { transformConfig } from "./transformConfig";
import { transformData } from "./transformData";

/**
 * @name transform
 * @param {Object} data
 * @param {Object.<string, function>=} propertyValueTransformWith
 * @returns {Object}
 */
export function transform(
  data: IObject,
  propertyValueTransformWith: ITransform = {},
): IObject {
  const config = transformConfig(propertyValueTransformWith);
  if (objectIsEmpty(config)) {
    return data;
  }
  return transformData(config, data);
}
