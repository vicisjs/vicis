import { IOrder } from "../../interface/config/IOrder";

import { arrayGetUnique } from "../../util/array/get/unique";
import { arrayIsEmpty } from "../../util/array/is/empty";
import { isString } from "../../util/is/string";
import { jsonStringify } from "../../util/json/stringify";

/**
 * @name orderConfig
 * @throws TypeError
 * @param {Array.<string>} propertiesToStreamline
 * @returns {Array.<string>}
 */
function orderConfig(propertiesToStreamline: IOrder): IOrder {
  if (!Array.isArray(propertiesToStreamline)) {
    throw new TypeError("'Order' should be an array");
  }
  if (arrayIsEmpty(propertiesToStreamline)) {
    return [];
  }
  return arrayGetUnique(propertiesToStreamline, false).map((value) => {
    if (!isString(value)) {
      throw new TypeError(
        `'Order' expect array of strings. Value: '${jsonStringify(value)}'.`,
      );
    }
    return value;
  });
}

export { orderConfig };
