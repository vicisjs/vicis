import { IObject } from "../../interface/common/IObject";
import { ITransform } from "../../interface/config/ITransform";

import { clone } from "../../util/variable/clone";
import { isFunction } from "../../util/is/function";
import { objectIsEmpty } from "../../util/object/is/empty";

/**
 * @name transformData
 * @param {Object.<string, function>} propertyValueTransformWith
 * @param {Object} dataToSerialize
 * @returns {Object}
 */
function transformData(
  propertyValueTransformWith: ITransform,
  dataToSerialize: IObject,
): IObject {
  if (objectIsEmpty(propertyValueTransformWith)) {
    return dataToSerialize;
  }
  Object.keys(propertyValueTransformWith).forEach((key) => {
    if (!(key in dataToSerialize)) {
      throw new Error(`Field '${key}' suppose to be transformed.`);
    }
    if (isFunction(propertyValueTransformWith[key])) {
      dataToSerialize[key] = propertyValueTransformWith[key](
        dataToSerialize[key],
        key,
        clone(dataToSerialize),
      );
    } else {
      // @ts-ignore
      dataToSerialize[key] = propertyValueTransformWith[key].toFunction()(
        dataToSerialize[key],
        key,
        clone(dataToSerialize),
      );
    }
  });
  return dataToSerialize;
}

export { transformData };
