import objectIsEmpty from "@corefunc/corefunc/object/is/empty";

import transformConfig from "./transformConfig";
import transformData from "./transformData";

/**
 * @name transform
 * @param {Object} data
 * @param {Object.<string, function>=} propertyValueTransformWith
 * @returns {Object}
 */
export default function transform(data, propertyValueTransformWith = {}) {
  const config = transformConfig(propertyValueTransformWith);
  if (objectIsEmpty(config)) {
    return data;
  }
  return transformData(config, data);
}
