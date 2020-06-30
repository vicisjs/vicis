export function objectGetProperty(
  object: { [key: string]: any },
  key: string,
  defaultValue?: any,
): any {
  if (key in object) {
    return object[key];
  }
  return defaultValue;
}
