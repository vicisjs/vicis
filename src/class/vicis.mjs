import cloneDeep from "lodash.clonedeep";

import VicisConfig from "./config.mjs";

//#region Constants
const TYPES_ENUM = {
  BOOLEAN: "boolean",
  NUMERIC: "numeric",
  INTEGER: "integer",
  STRING: "string",
  JSON: "json",
};
//#endregion

//#region Helper Functions
/**
 * @name castToJson
 * @param {*} value
 * @param {boolean=true} sort
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
 * @param {boolean=true} isDeep
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
 * name isObjectLike
 * @param {*} value
 * @returns {boolean}
 */
function isObjectLike(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
/**
 * @name objectKeys
 * @param {Object} object
 * @returns {String[]}
 */
function objectKeys(object) {
  return Object.keys(object).sort((alpha, beta) => alpha.localeCompare(beta));
}
//#endregion

class Vicis extends VicisConfig {
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
    super(config);
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
