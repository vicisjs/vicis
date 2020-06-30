import { jsonStringify } from "../json/stringify";
import { isFunction } from "../is/function";
import { isString } from "../is/string";

/**
 * @name objectSerialize
 * @param {object|string} value
 * @returns {string}
 */
export function objectSerialize(value: any): string {
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
