import isString from "../is/isString";
import jsonParse from "../json/parse";

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
