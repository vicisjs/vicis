import { IObject } from "../../../interface/common/IObject";

import { ESort } from "../../../const/ESort";

import { jsonParse } from "../../json/parse";
import { jsonStringify } from "../../json/stringify";
import { objectKeysSort } from "../../object/keys/sort";

import { sortAsBoolean } from "../../../core/config/sortAsBoolean";

/**
 * @name castToJson
 * @param {*} value
 * @param {boolean=} sort
 * @returns {*}
 */
function castToJson(
  value: any,
  sort: boolean | ESort = ESort.Default,
): IObject {
  if (sortAsBoolean(sort)) {
    return objectKeysSort(jsonParse(jsonStringify(value)), true);
  } else {
    return jsonParse(jsonStringify(value));
  }
}

export { castToJson };
