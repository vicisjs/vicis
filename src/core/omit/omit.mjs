import isArrayEmpty from "../../util/check/isArrayEmpty";
import omitConfig from "./omitConfig";

/**
 * @name omit
 * @throws TypeError
 * @param {Object} data
 * @param {Array.<string>=} propertiesToOmit
 * @returns {Object}
 */
export default function omit(data, propertiesToOmit = []) {
  const config = omitConfig(propertiesToOmit);
  if (isArrayEmpty(config)) {
    return data;
  }
  const dataToSerialize = {};
  Object.keys(data).forEach((key) => {
    if (config.includes(key)) {
      return;
    }
    dataToSerialize[key] = data[key];
  });
  return dataToSerialize;
}
