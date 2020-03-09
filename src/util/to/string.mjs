/**
 * @name toString
 * @param {*} value
 * @returns string
 */
export default function toString(value) {
  if (!value) {
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
