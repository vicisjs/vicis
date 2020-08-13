import { IObject } from "../../interface/common/IObject";
import { IOrder } from "../../interface/config/IOrder";

import { ESort } from "../../const/ESort";

import { sortAsBoolean } from "../config/sortAsBoolean";

import { arrayIsEmpty } from "../../util/array/is/empty";
import { objectKeysOrder } from "../../util/object/keys/order";

/**
 * @name orderData
 * @param {Array.<string>} propertiesToStreamline
 * @param {Object} data
 * @param {boolean=} sort
 * @returns {Object}
 */
export function orderData(
  propertiesToStreamline: IOrder,
  data: IObject,
  sort: boolean | ESort = ESort.Default,
): IObject {
  if (arrayIsEmpty(propertiesToStreamline)) {
    return data;
  }
  return objectKeysOrder(data, propertiesToStreamline, sortAsBoolean(sort));
}
