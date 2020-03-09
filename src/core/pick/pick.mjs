import isArrayEmpty from "../../util/check/isArrayEmpty";
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
  if (isArrayEmpty(config)) {
    return data;
  }
  return pickData(config, data);
}
