import objectIsEmpty from "@corefunc/corefunc/object/is/empty.mjs";

import transformConfig from "./transformConfig.mjs";
import transformData from "./transformData.mjs";

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
