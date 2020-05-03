import arrayIsEmpty from "@corefunc/corefunc/array/is/empty";

import pickConfig from "./pickConfig";
import pickData from "./pickData";

/**
 * @name pick
 * @throws TypeError
 * @param {Object} data
 * @param {Array.<string>=} propertiesToPick
 * @returns {Object}
 */
export default function pick(data, propertiesToPick = []) {
  const config = pickConfig(propertiesToPick);
  if (arrayIsEmpty(config)) {
    return data;
  }
  return pickData(config, data);
}
