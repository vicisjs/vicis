import { castToString } from "@corefunc/corefunc/cast/to/string";

/**
 * @name transformToStringIfNotVoid
 * @param {unknown} value
 * @param {string} key
 * @param {Record<string, any>} data
 * @returns {*}
 * @since 2.2.0
 */
export function transformToStringIfNotVoid(value: unknown, key: string, data: Record<string, any>): unknown {
  if (data && key in data && data[key] !== undefined) {
    return castToString(value);
  }
  return undefined;
}
