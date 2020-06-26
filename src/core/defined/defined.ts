import { IDefined } from "../../interface/config/IDefined";
import { IObject } from "../../interface/common/IObject";

import { arrayIsEmpty } from "../../util/array/is/empty";
import { definedData } from "./definedData";

/**
 * @name defined
 * @throws TypeError
 * @param {Object} data
 * @param {Array.<string>=} propertiesMustBeDefined
 * @returns {Object}
 */
function defined(
  data: IObject,
  propertiesMustBeDefined: IDefined = [],
): IObject {
  if (arrayIsEmpty(propertiesMustBeDefined)) {
    return data;
  }
  return definedData(propertiesMustBeDefined, data);
}

export { defined };
