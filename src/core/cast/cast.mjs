import objectIsEmpty from "@corefunc/corefunc/object/is/empty";

import castConfig from "./castConfig";
import castData from "./castData";

/**
 * @name cast
 * @throws TypeError
 * @param {Object} data
 * @param {Object.<string, string>=} propertyToType
 * @returns {Object}
 */
export default function cast(data, propertyToType = {}) {
  const config = castConfig(propertyToType);
  if (objectIsEmpty(config)) {
    return data;
  }
  return castData(config, data);
}
