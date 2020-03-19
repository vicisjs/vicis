import objectKeysSort from "@corefunc/corefunc/object/keys/sort.mjs";

import CONFIG_SORT from "../../const/configSort";

import jsonParse from "../json/parse";
import jsonStringify from "../json/stringify";

/**
 * @name castToJson
 * @param {*} value
 * @param {boolean=} sort
 * @returns {*}
 */
export default function castToJson(value, sort = CONFIG_SORT) {
  if (sort) {
    return objectKeysSort(jsonParse(jsonStringify(value)), true);
  } else {
    return jsonParse(jsonStringify(value));
  }
}
