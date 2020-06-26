import { isString } from "../is/string";
import { jsonParse } from "../json/parse";

/**
 * @name objectDeserialize
 * @param {string} value
 * @returns {*}
 */
function objectDeserialize(value: string): any {
  if (isString(value)) {
    return jsonParse(value);
  }
  return value;
}

export { objectDeserialize };
