declare const Buffer: {
  allocUnsafe: (arg0: any) => any;
  from: (arg0: any) => any;
};

function clone(val: any) {
  switch (typeOf(val)) {
    case "arraybuffer":
      return cloneArrayBuffer(val);
    case "array":
      return val.slice();
    case "object":
      return Object.assign({}, val);
    case "date":
      return new val.constructor(Number(val));
    case "map":
      return new Map(val);
    case "set":
      return new Set(val);
    case "buffer":
      return cloneBuffer(val);
    case "symbol":
      return cloneSymbol(val);
    case "float32array":
    case "float64array":
    case "int16array":
    case "int32array":
    case "int8array":
    case "uint16array":
    case "uint32array":
    case "uint8clampedarray":
    case "uint8array":
      return cloneTypedArray(val);
    case "regexp":
      return cloneRegExp(val);
    case "error":
      return Object.create(val);
    default: {
      return val;
    }
  }
}
function cloneRegExp(val: any) {
  let flags;
  if (val.flags !== undefined) {
    flags = val.flags;
  } else {
    flags = /\w+$/.exec(val) || undefined;
  }
  const re = new val.constructor(val.source, flags);
  re.lastIndex = val.lastIndex;
  return re;
}
function cloneArrayBuffer(val: any) {
  const res = new val.constructor(val.byteLength);
  new Uint8Array(res).set(new Uint8Array(val));
  return res;
}
function cloneTypedArray(val: any) {
  return new val.constructor(val.buffer, val.byteOffset, val.length);
}
function cloneBuffer(val: any) {
  const len = val.length;
  let buf;
  if (Buffer.allocUnsafe) {
    buf = Buffer.allocUnsafe(len);
  } else {
    buf = Buffer.from(len);
  }
  val.copy(buf);
  return buf;
}
function cloneSymbol(val: symbol) {
  if (Symbol.prototype.valueOf) {
    return Object(Symbol.prototype.valueOf.call(val));
  }
  return {};
}
function isBuffer(obj: any) {
  return (
    obj !== null &&
    Boolean(obj.constructor) &&
    typeof obj.constructor.isBuffer === "function" &&
    obj.constructor.isBuffer(obj)
  );
}
function typeOf(val: any) {
  if (typeof val === "undefined") {
    return "undefined";
  }
  if (val === null) {
    return "null";
  }
  if (val === true || val === false || val instanceof Boolean) {
    return "boolean";
  }
  if (typeof val === "string" || val instanceof String) {
    return "string";
  }
  if (typeof val === "number" || val instanceof Number) {
    return "number";
  }
  if (typeof val === "function" || val instanceof Function) {
    return "function";
  }
  if (typeof Array.isArray !== "undefined" && Array.isArray(val)) {
    return "array";
  }
  if (val instanceof RegExp) {
    return "regexp";
  }
  if (val instanceof Date) {
    return "date";
  }
  const type = Object.prototype.toString.call(val);
  if (type === "[object RegExp]") {
    return "regexp";
  }
  if (type === "[object Date]") {
    return "date";
  }
  if (type === "[object Arguments]") {
    return "arguments";
  }
  if (type === "[object Error]") {
    return "error";
  }
  if (isBuffer(val)) {
    return "buffer";
  }
  if (type === "[object Set]") {
    return "set";
  }
  if (type === "[object WeakSet]") {
    return "weakset";
  }
  if (type === "[object Map]") {
    return "map";
  }
  if (type === "[object WeakMap]") {
    return "weakmap";
  }
  if (type === "[object Symbol]") {
    return "symbol";
  }
  if (type === "[object Int8Array]") {
    return "int8array";
  }
  if (type === "[object Uint8Array]") {
    return "uint8array";
  }
  if (type === "[object Uint8ClampedArray]") {
    return "uint8clampedarray";
  }
  if (type === "[object Int16Array]") {
    return "int16array";
  }
  if (type === "[object Uint16Array]") {
    return "uint16array";
  }
  if (type === "[object Int32Array]") {
    return "int32array";
  }
  if (type === "[object Uint32Array]") {
    return "uint32array";
  }
  if (type === "[object Float32Array]") {
    return "float32array";
  }
  if (type === "[object Float64Array]") {
    return "float64array";
  }
  if (type === "[object ArrayBuffer]") {
    return "arraybuffer";
  }
  return "object";
}
function isObject(obj: any) {
  return typeof obj === "object" && obj !== null;
}
function isObjectObject(obj: any) {
  return (isObject(obj) &&
    Object.prototype.toString.call(obj) === "[object Object]");
}
function isPlainObject(obj: any) {
  if (!isObjectObject(obj)) {
    return false;
  }
  const ctor = obj.constructor;
  if (typeof ctor !== "function") {
    return false;
  }
  const prototype = ctor.prototype;
  if (!isObjectObject(prototype)) {
    return false;
  }
  // eslint-disable-next-line no-prototype-builtins
  return prototype.hasOwnProperty("isPrototypeOf");
}
function cloneObjectDeep(val: any, instanceClone: any) {
  if (typeof instanceClone === "function") {
    return instanceClone(val);
  }
  if (instanceClone || isPlainObject(val)) {
    const res = new val.constructor();
    for (const key in val) {
      // noinspection JSUnfilteredForInLoop
      res[key] = cloneDeep(val[key], instanceClone);
    }
    return res;
  }
  return val;
}
function cloneArrayDeep(val: any, instanceClone: any) {
  const res = new val.constructor(val.length);
  for (let index = 0; index < val.length; index++) {
    res[index] = cloneDeep(val[index], instanceClone);
  }
  return res;
}
function cloneDeep<T extends any>(value: T, instanceClone?: T): T {
  switch (typeOf(value)) {
    case "object":
      return cloneObjectDeep(value, instanceClone);
    case "array":
      return cloneArrayDeep(value, instanceClone);
    default: {
      return clone(value);
    }
  }
}
export { cloneDeep };
