import { IDefined } from "../../interface/config/IDefined";
import { IObject } from "../../interface/common/IObject";

import { arrayIsEmpty } from "../../util/array/is/empty";

import { definedConfig } from "./definedConfig";

/**
 * @name definedData
 * @throws TypeError
 * @param {Array.<string>} propertiesMustBeDefined
 * @param {Object} dataToSerialize
 * @returns {Object}
 */
function definedData(
  propertiesMustBeDefined: IDefined,
  dataToSerialize: IObject,
): IObject {
  const config = definedConfig(propertiesMustBeDefined);
  if (arrayIsEmpty(config)) {
    return dataToSerialize;
  }
  config.forEach((key) => {
    if (!(key in dataToSerialize)) {
      throw new Error(`Field '${key}' must be defined.`);
    }
    if (dataToSerialize[key] === undefined) {
      throw new Error(`Field '${key}' should have value.`);
    }
  });
  return dataToSerialize;
}

export { definedData };
