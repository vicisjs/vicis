import objectIsEmpty from "@corefunc/corefunc/object/is/empty.mjs";

import defaultsConfig from "./defaultsConfig";
import defaultsData from "./defaultsData";
/**
 * @name defaults
 * @throws TypeError
 * @param {Object} data
 * @param {Object.<string, *>=} propertyDefaultValues
 * @returns {Object}
 */
export default function defaults(data, propertyDefaultValues = {}) {
  const config = defaultsConfig(propertyDefaultValues);
  if (objectIsEmpty(config)) {
    return data;
  }
  return defaultsData(propertyDefaultValues, data);
}
