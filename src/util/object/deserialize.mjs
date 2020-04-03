import isString from "@corefunc/corefunc/is/string.mjs";

import jsonParse from "../json/parse.mjs";

/**
 * @name objectDeserialize
 * @param {string} value
 * @returns {*}
 */
export default function objectDeserialize(value) {
  if (isString(value)) {
    return jsonParse(value);
  }
  return value;
}
