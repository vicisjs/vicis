import VicisConfig from "./config.mjs";
import { isObjectLike } from "../helper/isObjectLike.mjs";
import { toString } from "../helper/toString.mjs";
import { castToJson } from "../helper/castToJson.mjs";
import { clone } from "../helper/clone.mjs";

const TYPES_ENUM = {
  BOOLEAN: "boolean",
  NUMERIC: "numeric",
  INTEGER: "integer",
  STRING: "string",
  JSON: "json",
};

export default class VicisData extends VicisConfig {
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
  /**
   * @name constructor
   * @public
   * @constructor
   * @param {Object=} config
   */
  constructor(config = {}) {
    super(config);
  }
  /**
   * @name getData
   * @public
   * @return {{}}
   */
  getData() {
    return clone(this.#dataCache);
  }
  /**
   * @name setData
   * @public
   * @throws TypeError
   * @param {Object} dataToSerialize
   * @return {VicisData}
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
   * @return {VicisData}
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
}
