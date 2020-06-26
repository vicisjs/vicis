import { ICast } from "../../interface/config/ICast";
import { IObject } from "../../interface/common/IObject";

import { objectIsEmpty } from "../../util/object/is/empty";

import { castConfig } from "./castConfig";
import { castData } from "./castData";

/**
 * @name cast
 * @throws TypeError
 * @param {Object} data
 * @param {Object.<string, string>=} propertyToType
 * @returns {Object}
 */
function cast(data: IObject, propertyToType: ICast): IObject {
  const config = castConfig(propertyToType);
  if (objectIsEmpty(config)) {
    return data;
  }
  return castData(config, data);
}

export { cast };
