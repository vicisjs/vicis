import { isFunction } from "../is/function";

export function checkIsCallable(value: any): boolean {
  if (!value) {
    return false;
  }
  if (isFunction(value)) {
    return true;
  }
  if (
    "toFunction" in value &&
    isFunction(value.toFunction) &&
    isFunction(value.toFunction())
  ) {
    return true;
  }
  //
  return false;
}
