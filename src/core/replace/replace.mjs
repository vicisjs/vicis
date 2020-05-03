import objectIsEmpty from "@corefunc/corefunc/object/is/empty";

import replaceConfig from "./replaceConfig";
import replaceData from "./replaceData";

/**
 * @name replace
 * @throws TypeError
 * @param {Object} data
 * @param {Object.<string, *>=} replacePropertyValues
 * @returns {Object}
 */
export default function replace(data, replacePropertyValues = {}) {
  const config = replaceConfig(replacePropertyValues);
  if (objectIsEmpty(config)) {
    return data;
  }
  return replaceData(config, data);
}
