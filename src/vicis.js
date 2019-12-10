/**
 * @param {*[]} a
 * @param {*[]} b
 * @returns {boolean}
 */
function arrayHasSame(a, b) {
  if (!a.length || !b.length) {
    return false;
  }
  const setB = new Set(b);
  return !![...new Set(a)].filter((x) => setB.has(x)).length;
}

/**
 * @param {*[]} array
 * @returns {*[]}
 */
function arrayUnique(array) {
  if (array.length < 2) {
    return array;
  }
  let unique = [...new Set(array)];
  if (unique.includes(0)) {
    const zeroes = array.filter((value) => value === 0);
    if (zeroes.length > 1 && zeroes.some((value) => 1 / value === Number.NEGATIVE_INFINITY)) {
      unique.push(-0);
    }
  }
  if (unique.filter((value) => typeof value === "string").length) {
    const strings = array.filter((value) => typeof value === "string");
    if (strings.length > 1) {
      [...new Set(strings.map((value) => value.normalize()))].forEach((value) => {
        delete unique[unique.indexOf(value)];
      });
      const compacted = [];
      for (let index = 0; index < unique.length; index += 1) {
        if (index in unique) {
          compacted.push(unique[index]);
        }
      }
      unique = compacted;
    }
  }
  return unique.sort();
}

/**
 * @param {*[]} a
 * @param {*[]} b
 * @returns {*[]}
 */
function arrayIntersect(a, b) {
  if (!a.length || !b.length) {
    return [];
  }
  const setB = new Set(b);
  return [...new Set(a)].filter((x) => setB.has(x));
}

/**
 * @param {*} value
 * @returns {boolean}
 */
function isFunction(value) {
  return Object.prototype.toString.call(value) === "[object Function]";
}

/**
 * @param {*} value
 * @returns {boolean}
 */
function isObjectLike(value) {
  return value != null && typeof value == "object";
}

/**
 * @param {*} value
 * @returns {boolean}
 */
function isString(value) {
  return typeof value === "string";
}

/**
 * @param {*} value
 * @returns string
 */
function toString(value) {
  if (!value) {
    return "";
  }
  if (typeof value == "string") {
    return value;
  }
  const result = value.toString();
  if (result === "0" && 1 / value === Number.NEGATIVE_INFINITY) {
    return "-0";
  }
  return result;
}

const TYPES_ENUM = {
  BOOLEAN: "boolean",
  NUMERIC: "numeric",
  INTEGER: "integer",
  STRING: "string",
  JSON: "json",
};

const TYPES_LIST = ["boolean", "numeric", "integer", "string", "json"];

class Vicis {
  /**
   * @public
   * @constructor
   * @param {object} data
   * @param {object} config
   */
  constructor(data, config = {}) {
    /**
     * @protected
     * @type {string[]}
     */
    this.errors = [];
    this.setConfig(config);
    this.setData(data);
  }
  /**
   * @name setConfig
   * @protected
   * @throws TypeError
   * @param {Object<string, object>} config
   * @return {Vicis}
   */
  setConfig(config = {}) {
    if (!isObjectLike(config)) {
      throw new TypeError("'Config' should be an object");
    }
    this.config = {
      cast: {},
      defined: [],
      omit: [],
      pick: [],
      rename: {},
      replace: {},
      required: [],
      transform: {},
    };
    this.setConfigOmit(config.omit);
    this.setConfigCast(config.cast);
    this.setConfigDefined(config.defined);
    this.setConfigPick(config.pick);
    this.setConfigRename(config.rename);
    this.setConfigReplace(config.replace);
    this.setConfigRequired(config.required);
    this.setConfigTransform(config.transform);
    this.checkConfig();
    return this;
  }
  /**
   * @name setConfigCast
   * @protected
   * @throws TypeError
   * @param {Object<string, string>} config
   * @return {Vicis}
   */
  setConfigCast(config = {}) {
    if (!isObjectLike(config)) {
      throw new TypeError("'cast' should be an object");
    }
    const newConfig = {};
    Object.keys(config).forEach((key) => {
      if (!isString(config[key])) {
        throw new TypeError(`'cast' expect object values to be strings. Not a string at key: <${config[key]}>.`);
      }
      if (!TYPES_LIST.includes(config[key])) {
        throw new TypeError(`'cast' has unknown type in {${key}: "${config[key]}"}.`);
      }
      newConfig[key] = config[key];
    });
    this.config.cast = newConfig;
    return this;
  }
  /**
   * @name setConfigDefined
   * @protected
   * @throws TypeError
   * @param {string[]} config
   * @return {Vicis}
   */
  setConfigDefined(config = []) {
    if (!Array.isArray(config)) {
      throw new TypeError("'defined' should be an array");
    }
    this.config.defined = arrayUnique(config).map((value) => {
      if (!isString(value)) {
        throw new TypeError(`'defined' expect array of strings. Value: <${value.toString()}>.`);
      }
      return value;
    });
    return this;
  }
  /**
   * @name setConfigOmit
   * @protected
   * @throws TypeError
   * @param {string[]} config
   * @return {Vicis}
   */
  setConfigOmit(config = []) {
    if (!Array.isArray(config)) {
      throw new TypeError("'omit' should be an array");
    }
    this.config.omit = arrayUnique(config).map((value) => {
      if (!isString(value)) {
        throw new TypeError(`'omit' expect array of strings. Value: <${value.toString()}>.`);
      }
      return value;
    });
    return this;
  }
  /**
   * @name setConfigPick
   * @protected
   * @throws TypeError
   * @param {string[]} config
   * @return {Vicis}
   */
  setConfigPick(config = []) {
    if (!Array.isArray(config)) {
      throw new TypeError("'pick' should be an array");
    }
    this.config.pick = arrayUnique(config).map((value) => {
      if (!isString(value)) {
        throw new TypeError(`'pick' expect array of strings. Value: <${value.toString()}>.`);
      }
      return value;
    });
    return this;
  }
  /**
   * @name setConfigRename
   * @protected
   * @throws TypeError
   * @param {Object<string, function>} config
   * @return {Vicis}
   */
  setConfigRename(config = {}) {
    if (!isObjectLike(config)) {
      throw new TypeError("'rename' should be an object");
    }
    const newConfig = {};
    Object.keys(config).forEach((key) => {
      if (!isString(key)) {
        throw new TypeError(`'rename' expect object values to be strings. Not a string at key: <${key}>.`);
      }
      newConfig[key] = config[key];
    });
    const rename = Object.values(this.config.rename);
    const renameTo = arrayIntersect(rename, arrayUnique(rename));
    if (rename.length !== renameTo.length) {
      throw new Error(`'rename' has similar values: ${renameTo.join(",")}.`);
    }
    this.config.rename = newConfig;
    return this;
  }
  /**
   * @name setConfigReplace
   * @protected
   * @throws TypeError
   * @param {Object<string, function>} config
   * @return {Vicis}
   */
  setConfigReplace(config = {}) {
    if (!isObjectLike(config)) {
      throw new TypeError("'replace' should be an object");
    }
    this.config.replace = { ...config };
    return this;
  }
  /**
   * @name setConfigRequired
   * @protected
   * @throws TypeError
   * @param {string[]} config
   * @return {Vicis}
   */
  setConfigRequired(config = []) {
    if (!Array.isArray(config)) {
      throw new TypeError("'required' should be an array");
    }
    this.config.required = arrayUnique(config).map((value) => {
      if (!isString(value)) {
        throw new TypeError(`'required' expect array of strings. Value: <${value.toString()}>.`);
      }
      return value;
    });
    return this;
  }
  /**
   * @name setConfigTransform
   * @protected
   * @throws TypeError
   * @param {Object<string, function>} config
   * @return {Vicis}
   */
  setConfigTransform(config = {}) {
    if (!isObjectLike(config)) {
      throw new TypeError("'transform' should be an object");
    }
    const newConfig = {};
    Object.keys(config).forEach((key) => {
      if (!isFunction(config[key])) {
        throw new TypeError(`'transform' expect object values to be functions. Not a function at key: <${key}>.`);
      }
      newConfig[key] = config[key];
    });
    this.config.transform = newConfig;
    return this;
  }
  /**
   * @name checkConfig
   * @protected
   * @throws Error
   * @return {Vicis}
   */
  checkConfig() {
    if (arrayHasSame(this.config.omit, this.config.cast)) {
      throw new Error(`'omit' has same keys as 'cast': ${arrayIntersect(this.config.omit, this.config.cast)}.`);
    }
    if (arrayHasSame(this.config.omit, this.config.defined)) {
      throw new Error(`'omit' has same keys as 'defined': ${arrayIntersect(this.config.omit, this.config.defined)}.`);
    }
    if (arrayHasSame(this.config.omit, this.config.pick)) {
      throw new Error(`'omit' has same keys as 'pick': ${arrayIntersect(this.config.omit, this.config.pick)}.`);
    }
    if (arrayHasSame(this.config.omit, this.config.rename)) {
      throw new Error(`'omit' has same keys as 'rename': ${arrayIntersect(this.config.omit, this.config.rename)}.`);
    }
    if (arrayHasSame(this.config.omit, this.config.replace)) {
      throw new Error(`'omit' has same keys as 'replace': ${arrayIntersect(this.config.omit, this.config.replace)}.`);
    }
    if (arrayHasSame(this.config.omit, this.config.required)) {
      throw new Error(`'omit' has same keys as 'required': ${arrayIntersect(this.config.omit, this.config.required)}.`);
    }
    if (arrayHasSame(this.config.omit, this.config.transform)) {
      throw new Error(
        `'omit' has same keys as 'transform': ${arrayIntersect(this.config.omit, this.config.transform)}.`,
      );
    }
    if (arrayHasSame(this.config.cast, this.config.replace)) {
      throw new Error(`'cast' has same keys as 'replace': ${arrayIntersect(this.config.cast, this.config.replace)}.`);
    }
    if (arrayHasSame(this.config.cast, this.config.transform)) {
      throw new Error(
        `'cast' has same keys as 'transform': ${arrayIntersect(this.config.cast, this.config.transform)}.`,
      );
    }
    if (arrayHasSame(this.config.replace, this.config.transform)) {
      throw new Error(
        `'replace' has same keys as 'transform': ${arrayIntersect(this.config.replace, this.config.transform)}.`,
      );
    }
    return this;
  }
  /**
   * @name setData
   * @protected
   * @throws TypeError
   * @param {Object} data
   * @return {Vicis}
   */
  setData(data) {
    if (!isObjectLike(data)) {
      throw new TypeError("'data' should be an object");
    }
    this.original = data; // keep reference
    this.validateData();
    return this;
  }
  /**
   * @name validateData
   * @protected
   * @throws Error
   * @return {Vicis}
   */
  validateData() {
    this.cache = {};
    Object.keys(this.original).forEach((key) => {
      if (this.config.omit.includes(key)) {
        return;
      }
      this.cache[key] = this.original[key];
    });
    this.config.required.forEach((key) => {
      if (!(key in this.cache)) {
        throw new Error(`Field <${key}> is required.`);
      }
    });
    this.config.defined.forEach((key) => {
      if (!(key in this.cache)) {
        throw new Error(`Field <${key}> is required.`);
      }
      if (this.cache[key] === undefined) {
        throw new Error(`Field <${key}> should have value.`);
      }
    });
    Object.keys(this.config.cast).forEach((key) => {
      const to = this.config.cast[key];
      if (!(key in this.cache)) {
        throw new Error(`Field <${key}> suppose to be converted to ${to}.`);
      }
      switch (to) {
        case TYPES_ENUM.BOOLEAN:
          this.cache[key] = Boolean(this.cache[key]);
          break;
        case TYPES_ENUM.NUMERIC: {
          const castedNumber = Number(this.cache[key]);
          if (Number.isFinite(castedNumber)) {
            this.cache[key] = castedNumber;
          } else {
            const parsed = Number.parseFloat(this.cache[key]);
            if (Number.isFinite(parsed)) {
              this.cache[key] = parsed;
            } else {
              this.cache[key] = 0;
            }
          }
          break;
        }
        case TYPES_ENUM.INTEGER: {
          const castedInteger = Number(this.cache[key]);
          if (Number.isFinite(castedInteger)) {
            this.cache[key] = Math.trunc(castedInteger);
          } else {
            const parsed = Number.parseFloat(this.cache[key]);
            if (Number.isFinite(parsed)) {
              this.cache[key] = Math.trunc(castedInteger);
            } else {
              this.cache[key] = 0;
            }
          }
          break;
        }
        case TYPES_ENUM.STRING:
          this.cache[key] = toString(this.cache[key]);
          break;
        case TYPES_ENUM.JSON:
          this.cache[key] = JSON.parse(JSON.stringify(this.cache[key]));
          break;
        default:
          throw new Error("Unknown value convert error");
      }
    });
    Object.keys(this.config.transform).forEach((key) => {
      if (!(key in this.cache)) {
        throw new Error(`Field <${key}> suppose to be transformed.`);
      }
      this.cache[key] = this.config.transform[key](this.cache[key], key);
    });
    Object.keys(this.config.replace).forEach((key) => {
      this.cache[key] = this.config.replace[key];
    });
    const renameFrom = Object.keys(this.config.rename).sort((a, b) => a.localeCompare(b));
    const renamedData = {};
    renameFrom.forEach((key) => {
      if (!(key in this.cache)) {
        throw new Error(`Field <${key}> suppose to be renamed.`);
      }
      renamedData[this.config.rename[key]] = this.cache[key];
    });
    renameFrom.forEach((key) => {
      delete this.cache[key];
    });
    Object.assign(this.cache, renamedData);
    if (Object.keys(this.config.pick).length > 0) {
      let newCache = {};
      Object.keys(this.cache).forEach((key) => {
        if (this.config.pick.includes(key)) {
          newCache[key] = this.cache[key];
        }
      });
      this.cache = newCache;
    }
    return this;
  }
  /**
   * @name getConfig
   * @public
   * @return {{}}
   */
  getConfig() {
    return { ...this.config };
  }
  /**
   * @name getErrors
   * @public
   * @return {string[]}
   */
  getErrors() {
    return [...this.errors];
  }
  /**
   * @name hasErrors
   * @public
   * @return {boolean}
   */
  hasErrors() {
    return this.errors.length > 0;
  }
  /**
   * @name valueOf
   * @public
   * @returns {{}}
   */
  valueOf() {
    return { ...this.cache };
  }
  /**
   * @name toJSON
   * @public
   * @returns {{}}
   */
  toJSON() {
    return { ...this.cache };
  }
  /**
   * @name toString
   * @public
   * @returns {string}
   */
  toString() {
    return JSON.stringify(this.cache);
  }
}

module.exports.default = Vicis;
module.exports.Vicis = Vicis;
module.exports.TYPES_ENUM = TYPES_ENUM;
module.exports.TYPES_LIST = TYPES_LIST;
