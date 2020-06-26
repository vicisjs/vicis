import { IObject } from "../../interface/common/IObject";
import { IOrder } from "../../interface/config/IOrder";

import { ESort } from "../../const/ESort";

import { arrayIsEmpty } from "../../util/array/is/empty";
import { objectKeysOrder } from "../../util/object/keys/order";

import { orderConfig } from "./orderConfig";
import { sortAsBoolean } from "../config/sortAsBoolean";

/**
 * @name order
 * @throws TypeError
 * @param {Object} data
 * @param {Array.<string>=} propertiesToStreamline
 * @param {boolean=} sort
 * @returns {Object}
 */
function order(
  data: IObject,
  propertiesToStreamline: IOrder = [],
  sort: boolean | ESort = ESort.Default,
): IObject {
  const config = orderConfig(propertiesToStreamline);
  if (arrayIsEmpty(config)) {
    return data;
  }
  return objectKeysOrder(data, propertiesToStreamline, sortAsBoolean(sort));
}

export { order };
