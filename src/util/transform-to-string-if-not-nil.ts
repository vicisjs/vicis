import { castToString } from "@corefunc/corefunc/cast/to/string";
import { isNil } from "@corefunc/corefunc/is/nil";

/**
 * @name transformToStringIfNotNil
 * @param {unknown} value
 * @param {string} key
 * @param {Record<string, any>} data
 * @returns {*}
 * @since 2.2.0
 */
export function transformToStringIfNotNil(value: unknown, key: string, data: Record<string, any>): unknown {
  if (data && key in data && !isNil(data[key])) {
    return castToString(value);
  }
  return value;
}
