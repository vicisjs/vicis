import isFunction from "@corefunc/corefunc/is/function.mjs";
import isString from "@corefunc/corefunc/is/string.mjs";

import jsonStringify from "../json/stringify.mjs";

/**
 * @name objectSerialize
 * @param {object|string} value
 * @returns {string}
 */
export default function objectSerialize(value) {
  let data;
  const { toJSON, toObject } = value;
  if (isFunction(toObject)) {
    data = value.toObject();
  } else if (isFunction(toJSON)) {
    data = value.toJSON();
  } else {
    data = value;
  }
  if (isString(data)) {
    return data;
  }
  return jsonStringify(data);
}
