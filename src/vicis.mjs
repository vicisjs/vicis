import cloneDeep from "lodash.clonedeep";

//#region Constants
const CONFIG_FIELDS = [
  "cast",
  "defaults",
  "defined",
  "omit",
  "pick",
  "sort",
  "rename",
  "replace",
  "required",
  "transform",
];
const TYPES_ENUM = {
  BOOLEAN: "boolean",
  NUMERIC: "numeric",
  INTEGER: "integer",
  STRING: "string",
  JSON: "json",
};
const TYPES_LIST = ["boolean", "numeric", "integer", "string", "json"];
//#endregion

//#region Helper Functions
/**
 * @name arrayDiff
 * @param {*[]} alpha
 * @param {*[]} beta
 * @returns {*[]}
 */
function arrayDiff(alpha, beta) {
  const set = new Set(beta);
  return alpha.filter((value) => !set.has(value));
}
/**
 * @name arrayHasSame
 * @param {*[]} alpha
 * @param {*[]} beta
 * @returns {Boolean}
 */
function arrayHasSame(alpha, beta) {
  if (!alpha.length || !beta.length) {
    return false;
  }
  const setB = new Set(beta);
  return [...new Set(alpha)].filter((x) => setB.has(x)).length > 0;
}
/**
 * @name arrayIntersect
 * @param {*[]} alpha
 * @param {*[]} beta
 * @returns {*[]}
 */
function arrayIntersect(alpha, beta) {
  if (!alpha.length || !beta.length) {
    return [];
  }
  const setB = new Set(beta);
  return [...new Set(alpha)].filter((x) => setB.has(x));
}
/**
 * @name arrayUnique
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
 * @name castToJson
 * @param {*} value
 * @param {Boolean=true} sort
 * @returns {*}
 */
function castToJson(value, sort = true) {
  if (sort) {
    return collectionSortKeys(JSON.parse(JSON.stringify(value)), true);
  } else {
    return JSON.parse(JSON.stringify(value));
  }
}
/**
 * @name clone
 * @param {*} value
 * @returns {*}
 */
function clone(value) {
  return cloneDeep(value);
}
/**
 * @name collectionSortKeys
 * @param {*} value
 * @param {Boolean=true} isDeep
 * @returns {*}
 */
function collectionSortKeys(value, isDeep = true) {
  if (!isObjectLike(value)) {
    return value;
  }
  const keys = objectKeys(value);
  if (!keys.length) {
    return value;
  }
  return keys.reduce((sorted, key) => {
    if (isDeep && isObjectLike(value[key])) {
      sorted[key] = collectionSortKeys(value[key], isDeep);
    } else {
      sorted[key] = value[key];
    }
    return sorted;
  }, {});
}
/**
 * @name isFunction
 * @param {*} value
 * @returns {Boolean}
 */
function isFunction(value) {
  return Object.prototype.toString.call(value) === "[object Function]";
}
/**
 * name isObjectLike
 * @param {*} value
 * @returns {Boolean}
 */
function isObjectLike(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
/**
 * @name isString
 * @param {*} value
 * @returns {Boolean}
 */
function isString(value) {
  return typeof value === "string";
}
/**
 * @name objectKeys
 * @param {Object} object
 * @returns {String[]}
 */
function objectKeys(object) {
  return Object.keys(object).sort((alpha, beta) => alpha.localeCompare(beta));
}
/**
 * @name toString
 * @param {*} value
 * @returns String
 */
function toString(value) {
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
//#endregion

class Vicis {
  //#region Config Fields
  /**
   * @name cast
   * @private
   * @type Object
   */
  #cast = {};
  /**
   * @name defaults
   * @private
   * @type Object
   */
  #defaults = [];
  /**
   * @name defined
   * @private
   * @type Array
   */
  #defined = [];
  /**
   * @name pick
   * @private
   * @type Array
   */
  #omit = [];
  /**
   * @name pick
   * @private
   * @type Array
   */
  #pick = [];
  /**
   * @name sort
   * @private
   * @type Boolean
   */
  #sort = true;
  /**
   * @name rename
   * @private
   * @type Object
   */
  #rename = {};
  /**
   * @name replace
   * @private
   * @type Object
   */
  #replace = {};
  /**
   * @name required
   * @private
   * @type Array
   */
  #required = [];
  /**
   * @name transform
   * @private
   * @type Object
   */
  #transform = {};
  //#endregion

  //#region Data Fields
  /**
   * @name dataCache
   * @private
   * @type Object
   */
  #dataCache = {};
  /**
   * @name dataOriginal
   * @private
   * @type Object
   */
  #dataOriginal = {};
  //#endregion

  //#region Initialization Methods
  /**
   * @name constructor
   * @public
   * @constructor
   * @param {Object=} config
   */
  constructor(config = {}) {
    this.config(config);
  }
  //#endregion

  //#region Static Methods
  /**
   * @name factory
   * @public
   * @static
   * @factory
   * @param {Object=} config
   * @returns {Vicis}
   */
  static factory(config = {}) {
    return new Vicis(config);
  }
  //#endregion

  //#region Public Config Methods
  /**
   * @name getConfig
   * @public
   * @type {Object}
   */
  getConfig() {
    return clone({
      cast: this.#cast,
      defaults: this.#defaults,
      defined: this.#defined,
      omit: this.#omit,
      pick: this.#pick,
      sort: this.#sort,
      rename: this.#rename,
      replace: this.#replace,
      required: this.#required,
      transform: this.#transform,
    });
  }
  /**
   * @name resetConfig
   * @public
   * @return {Vicis}
   */
  resetConfig() {
    this.#cast = {};
    this.#defaults = {};
    this.#defined = [];
    this.#omit = [];
    this.#pick = [];
    this.#sort = [];
    this.#rename = {};
    this.#replace = {};
    this.#required = [];
    this.#transform = {};
    return this;
  }
  /**
   * @name config
   * @public
   * @throws TypeError
   * @param {Object<String, Array|Boolean|Object>} config
   * @return {Vicis}
   */
  config(config = {}) {
    if (!isObjectLike(config)) {
      throw new TypeError("Config should be an object");
    }
    const diff = arrayDiff(objectKeys(config), CONFIG_FIELDS);
    if (diff.length) {
      throw new TypeError(`Config has unknown fields: '${diff.join("', '")}'.`);
    }
    this.resetConfig();
    this.sort(config.sort);
    this.omit(config.omit);
    this.cast(config.cast);
    this.defined(config.defined);
    this.pick(config.pick);
    this.rename(config.rename);
    this.replace(config.replace);
    this.required(config.required);
    this.transform(config.transform);
    this.defaults(config.defaults);
    this.validateConfig();
    return this;
  }
  /**
   * @name cast
   * @public
   * @throws TypeError
   * @param {Object<String, String>} propToType
   * @return {Vicis}
   */
  cast(propToType = {}) {
    if (!isObjectLike(propToType)) {
      throw new TypeError("'cast' should be an object");
    }
    const newConfig = {};
    Object.keys(propToType).forEach((key) => {
      if (!isString(propToType[key])) {
        throw new TypeError(`'cast' expect object values to be strings. Not a string at key: '${propToType[key]}'.`);
      }
      if (!TYPES_LIST.includes(propToType[key])) {
        throw new TypeError(`'cast' has unknown type in {${key}: "${propToType[key]}"}.`);
      }
      newConfig[key] = propToType[key];
    });
    this.#cast = newConfig;
    this.validateConfig();
    return this;
  }
  /**
   * @name defaults
   * @public
   * @throws TypeError
   * @param {Object<String, *>} propDefaultValues
   * @return {Vicis}
   */
  defaults(propDefaultValues = {}) {
    if (!isObjectLike(propDefaultValues)) {
      throw new TypeError("'defaults' should be an object");
    }
    this.#defaults = { ...propDefaultValues }; // do not deep clone!
    this.validateConfig();
    return this;
  }
  /**
   * @name defined
   * @public
   * @throws TypeError
   * @param {String[]} propsMustBeDefined
   * @return {Vicis}
   */
  defined(propsMustBeDefined = []) {
    if (!Array.isArray(propsMustBeDefined)) {
      throw new TypeError("'defined' should be an array");
    }
    this.#defined = arrayUnique(propsMustBeDefined).map((value) => {
      if (!isString(value)) {
        throw new TypeError(`'defined' expect array of strings. Value: '${value.toString()}'.`);
      }
      return value;
    });
    this.validateConfig();
    return this;
  }
  /**
   * @name omit
   * @public
   * @throws TypeError
   * @param {String[]} propsToOmit
   * @return {Vicis}
   */
  omit(propsToOmit = []) {
    if (!Array.isArray(propsToOmit)) {
      throw new TypeError("'omit' should be an array");
    }
    this.#omit = arrayUnique(propsToOmit).map((value) => {
      if (!isString(value)) {
        throw new TypeError(`'omit' expect array of strings. Value: '${value.toString()}'.`);
      }
      return value;
    });
    this.validateConfig();
    return this;
  }
  /**
   * @name pick
   * @public
   * @throws TypeError
   * @param {String[]} propsToPick
   * @return {Vicis}
   */
  pick(propsToPick = []) {
    if (!Array.isArray(propsToPick)) {
      throw new TypeError("'pick' should be an array");
    }
    this.#pick = arrayUnique(propsToPick).map((value) => {
      if (!isString(value)) {
        throw new TypeError(`'pick' expect array of strings. Value: '${value.toString()}'.`);
      }
      return value;
    });
    this.validateConfig();
    return this;
  }
  /**
   * @name rename
   * @public
   * @throws TypeError
   * @param {Object<String, Function>} renameFromTo
   * @return {Vicis}
   */
  rename(renameFromTo = {}) {
    if (!isObjectLike(renameFromTo)) {
      throw new TypeError("'rename' should be an object");
    }
    const newConfig = {};
    Object.keys(renameFromTo).forEach((key) => {
      if (!isString(key)) {
        throw new TypeError(`'rename' expect object values to be strings. Not a string at key: '${key}'.`);
      }
      newConfig[key] = renameFromTo[key];
    });
    const rename = Object.values(this.#rename);
    const renameTo = arrayIntersect(rename, arrayUnique(rename));
    if (rename.length !== renameTo.length) {
      throw new Error(`'rename' has similar values: ${renameTo.join(",")}.`);
    }
    this.#rename = newConfig;
    this.validateConfig();
    return this;
  }
  /**
   * @name replace
   * @public
   * @throws TypeError
   * @param {Object<String, *>} overrideValues
   * @return {Vicis}
   */
  replace(overrideValues = {}) {
    if (!isObjectLike(overrideValues)) {
      throw new TypeError("'replace' should be an object");
    }
    this.#replace = { ...overrideValues }; // do not deep clone!
    this.validateConfig();
    return this;
  }
  /**
   * @name required
   * @public
   * @throws TypeError
   * @param {String[]} propsRequired
   * @return {Vicis}
   */
  required(propsRequired = []) {
    if (!Array.isArray(propsRequired)) {
      throw new TypeError("'required' should be an array");
    }
    this.#required = arrayUnique(propsRequired).map((value) => {
      if (!isString(value)) {
        throw new TypeError(`'required' expect array of strings. Value: '${value.toString()}'.`);
      }
      return value;
    });
    this.validateConfig();
    return this;
  }
  /**
   * @name sort
   * @public
   * @throws TypeError
   * @param {Boolean} sortProperties
   * @return {Vicis}
   */
  sort(sortProperties = true) {
    if (typeof sortProperties !== "boolean") {
      throw new TypeError("'sort' should be a boolean");
    }
    this.#sort = sortProperties;
    return this;
  }
  /**
   * @name transform
   * @public
   * @throws TypeError
   * @param {Object<String, Function>} propValueTransform
   * @return {Vicis}
   */
  transform(propValueTransform = {}) {
    if (!isObjectLike(propValueTransform)) {
      throw new TypeError("'transform' should be an object");
    }
    const newConfig = {};
    Object.keys(propValueTransform).forEach((key) => {
      if (!isFunction(propValueTransform[key])) {
        throw new TypeError(`'transform' expect object values to be functions. Not a function at key: '${key}'.`);
      }
      newConfig[key] = propValueTransform[key];
    });
    this.#transform = newConfig;
    this.validateConfig();
    return this;
  }
  /**
   * @name validateConfig
   * @protected
   * @throws Error
   * @return {Vicis}
   */
  validateConfig() {
    const cast = objectKeys(this.#cast);
    const rename = objectKeys(this.#rename);
    const replace = objectKeys(this.#replace);
    const transform = objectKeys(this.#transform);
    if (arrayHasSame(this.#omit, cast)) {
      throw new Error(`'omit' has same keys as 'cast': ${arrayIntersect(this.#omit, cast)}.`);
    }
    if (arrayHasSame(this.#omit, this.#defined)) {
      throw new Error(`'omit' has same keys as 'defined': ${arrayIntersect(this.#omit, this.#defined)}.`);
    }
    if (arrayHasSame(this.#omit, this.#pick)) {
      throw new Error(`'omit' has same keys as 'pick': ${arrayIntersect(this.#omit, this.#pick)}.`);
    }
    if (arrayHasSame(this.#omit, rename)) {
      throw new Error(`'omit' has same keys as 'rename': ${arrayIntersect(this.#omit, rename)}.`);
    }
    if (arrayHasSame(this.#omit, replace)) {
      throw new Error(`'omit' has same keys as 'replace': ${arrayIntersect(this.#omit, replace)}.`);
    }
    if (arrayHasSame(this.#omit, this.#required)) {
      throw new Error(`'omit' has same keys as 'required': ${arrayIntersect(this.#omit, this.#required)}.`);
    }
    if (arrayHasSame(this.#omit, transform)) {
      throw new Error(`'omit' has same keys as 'transform': ${arrayIntersect(this.#omit, transform)}.`);
    }
    if (arrayHasSame(this.#omit, transform)) {
      throw new Error(`'omit' has same keys as 'transform': ${arrayIntersect(this.#omit, transform)}.`);
    }
    if (arrayHasSame(cast, replace)) {
      throw new Error(`'cast' has same keys as 'replace': ${arrayIntersect(cast, replace)}.`);
    }
    if (arrayHasSame(cast, transform)) {
      throw new Error(`'cast' has same keys as 'transform': ${arrayIntersect(cast, transform)}.`);
    }
    if (arrayHasSame(replace, transform)) {
      throw new Error(`'replace' has same keys as 'transform': ${arrayIntersect(replace, transform)}.`);
    }
    return this;
  }
  //#endregion

  //#region Public Data Methods
  /**
   * @name getData
   * @public
   * @return {Object}
   */
  getData() {
    return clone(this.#dataCache);
  }
  /**
   * @name setData
   * @public
   * @throws TypeError
   * @param {Object} dataToSerialize
   * @return {Vicis}
   */
  data(dataToSerialize) {
    if (!isObjectLike(dataToSerialize)) {
      throw new TypeError("Data should be an object");
    }
    this.#dataOriginal = dataToSerialize; // keep reference
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
    this.#dataCache = {};
    const config = this.getConfig();
    Object.keys(this.#dataOriginal).forEach((key) => {
      if (config.omit.includes(key)) {
        return;
      }
      this.#dataCache[key] = this.#dataOriginal[key];
    });
    config.required.forEach((key) => {
      if (!(key in this.#dataCache)) {
        throw new Error(`Field '${key}' is required.`);
      }
    });
    config.defined.forEach((key) => {
      if (!(key in this.#dataCache)) {
        throw new Error(`Field '${key}' must be defined.`);
      }
      if (this.#dataCache[key] === undefined) {
        throw new Error(`Field '${key}' should have value.`);
      }
    });
    Object.keys(config.cast).forEach((key) => {
      const castTo = config.cast[key];
      if (!(key in this.#dataCache)) {
        throw new Error(`Field '${key}' suppose to be converted to ${castTo}.`);
      }
      switch (castTo) {
        case TYPES_ENUM.BOOLEAN:
          this.#dataCache[key] = Boolean(this.#dataCache[key]);
          break;
        case TYPES_ENUM.NUMERIC: {
          const castedNumber = Number(this.#dataCache[key]);
          if (Number.isFinite(castedNumber)) {
            this.#dataCache[key] = castedNumber;
          } else {
            const parsed = Number.parseFloat(this.#dataCache[key]);
            if (Number.isFinite(parsed)) {
              this.#dataCache[key] = parsed;
            } else {
              this.#dataCache[key] = 0;
            }
          }
          break;
        }
        case TYPES_ENUM.INTEGER: {
          const castedInteger = Number(this.#dataCache[key]);
          if (Number.isFinite(castedInteger)) {
            this.#dataCache[key] = Math.trunc(castedInteger);
          } else {
            const parsed = Number.parseFloat(this.#dataCache[key]);
            if (Number.isFinite(parsed)) {
              this.#dataCache[key] = Math.trunc(castedInteger);
            } else {
              this.#dataCache[key] = 0;
            }
          }
          break;
        }
        case TYPES_ENUM.STRING:
          this.#dataCache[key] = toString(this.#dataCache[key]);
          break;
        case TYPES_ENUM.JSON:
          this.#dataCache[key] = JSON.parse(JSON.stringify(this.#dataCache[key]));
          break;
        default:
          throw new Error("Unknown value convert error");
      }
    });
    Object.keys(config.transform).forEach((key) => {
      if (!(key in this.#dataCache)) {
        throw new Error(`Field '${key}' suppose to be transformed.`);
      }
      this.#dataCache[key] = config.transform[key](this.#dataCache[key], key);
    });
    Object.keys(config.replace).forEach((key) => {
      this.#dataCache[key] = config.replace[key];
    });
    const renameFrom = Object.keys(config.rename).sort((alpha, beta) => alpha.localeCompare(beta));
    const renamedData = {};
    renameFrom.forEach((key) => {
      if (!(key in this.#dataCache)) {
        throw new Error(`Field '${key}' suppose to be renamed.`);
      }
      renamedData[config.rename[key]] = this.#dataCache[key];
    });
    renameFrom.forEach((key) => {
      delete this.#dataCache[key];
    });
    Object.assign(this.#dataCache, renamedData);
    if (Object.keys(config.pick).length > 0) {
      let newCache = {};
      Object.keys(this.#dataCache).forEach((key) => {
        if (config.pick.includes(key)) {
          newCache[key] = this.#dataCache[key];
        }
      });
      this.#dataCache = newCache;
    }
    if (Object.keys(config.defaults).length > 0) {
      Object.keys(config.defaults).forEach((key) => {
        if (!(key in this.#dataCache) || this.#dataCache[key] === undefined) {
          this.#dataCache[key] = config.defaults[key];
        }
      });
    }
    this.#dataCache = castToJson(this.#dataCache, config.sort);
    return this;
  }
  //#endregion

  //#region Public Main Methods
  /**
   * @name toJSON
   * @public
   * @returns {Object}
   */
  toJSON() {
    return this.getData();
  }

  /**
   * @name toString
   * @public
   * @returns {String}
   */
  toString() {
    return JSON.stringify(this.toJSON());
  }
  //#endregion
}

export default Vicis;
export { Vicis };
