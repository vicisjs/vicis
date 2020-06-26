import { IObject } from "../../interface/common/IObject";
import { IReplace } from "../../interface/config/IReplace";

import { objectIsEmpty } from "../../util/object/is/empty";

import { replaceConfig } from "./replaceConfig";
import { replaceData } from "./replaceData";

/**
 * @name replace
 * @throws TypeError
 * @param {Object} data
 * @param {Object.<string, *>=} replacePropertyValues
 * @returns {Object}
 */
function replace(data: IObject, replacePropertyValues: IReplace = {}): IObject {
  const config = replaceConfig(replacePropertyValues);
  if (objectIsEmpty(config)) {
    return data;
  }
  return replaceData(config, data);
}

export { replace };
