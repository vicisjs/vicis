import objectIsEmpty from "@corefunc/corefunc/object/is/empty.mjs";

import replaceConfig from "./replaceConfig.mjs";
import replaceData from "./replaceData.mjs";

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
