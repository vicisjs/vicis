import { castToString } from "@corefunc/corefunc/cast/to/string";

/**
 * @name transformToStringIfNotNull
 * @param {unknown} value
 * @param {string} key
 * @param {Record<string, any>} data
 * @returns {*}
 * @since 2.2.0
 */
export function transformToStringIfNotNull(value: unknown, key: string, data: Record<string, any>): unknown {
  if (data && key in data && data[key] !== null) {
    return castToString(value);
  }
  return null;
}
