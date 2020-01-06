/**
 * @param {*} value
 * @returns String
 */
export function toString(value) {
  if (!value) {
    return "";
  }
  if (typeof value === "string") {
    return value;
  }
  const result = value.toString();
  if (result === "0" && 1 / value === Number.NEGATIVE_INFINITY) {
    return "-0";
  }
  return result;
}
