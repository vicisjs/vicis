/**
 * @name convertToFlag
 * @description
 * Turns: undefined, null, 0, "0", "", "false", "FALSE" to boolean false.
 * Turns: 1, 1n, "1", "true", "TRUE" to boolean true.
 * @param {*} value
 * @param {*=false} onEmpty
 * @param {*=false} onUnParsable
 * @returns {boolean}
 */
export function convertToFlag(
  value: any,
  onEmpty = false,
  onUnParsable = false,
): boolean {
  if (value === undefined || value === null) {
    return onEmpty;
  }
  if (typeof value === "boolean") {
    return value;
  }
  const affirmative = value.toString().toLocaleLowerCase().trim();
  if (affirmative.length === 0) {
    return onEmpty;
  }
  if (affirmative === "true" || affirmative === "1") {
    return true;
  }
  if (affirmative === "false" || affirmative === "0") {
    return false;
  }
  return onUnParsable;
}
