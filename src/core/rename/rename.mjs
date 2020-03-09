import isObjectEmpty from "../../util/check/isObjectEmpty";
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
  if (isObjectEmpty(config)) {
    return data;
  }
  return renameData(config, data);
}
