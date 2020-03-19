import objectIsEmpty from "@corefunc/corefunc/object/is/empty.mjs";

import renameConfig from "./renameConfig";
import renameData from "./renameData";

/**
 * @name rename
 * @param {Object} data
 * @param {Object.<string, string>=} renamePropertyFromTo
 * @returns {Object}
 */
export default function rename(data, renamePropertyFromTo = {}) {
  const config = renameConfig(renamePropertyFromTo);
  if (objectIsEmpty(config)) {
    return data;
  }
  return renameData(config, data);
}
