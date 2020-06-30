/**
 * @param {*} value
 * @returns string
 */
export function castToString(value: any): string {
  if (value === null || value === undefined) {
    return "";
  }
  if (typeof value === "string") {
    return value;
  }
  const result = value.toString();
  if (result === "0" && Object.is(value, -0)) {
    return "-0";
  }
  return result;
}
