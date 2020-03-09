import CONFIG_SORT from "../../const/configSort";
import collectionSortKeys from "../collection/sortKeys";
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
    return collectionSortKeys(jsonParse(jsonStringify(value)), true);
  } else {
    return jsonParse(jsonStringify(value));
  }
}
