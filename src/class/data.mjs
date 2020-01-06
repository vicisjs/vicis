import VicisConfig from "./config.mjs";
import { isObjectLike } from "../helper/isObjectLike.mjs";
import { toString } from "../helper/toString.mjs";
import { castToJson } from "../helper/castToJson.mjs";
//
const TYPES_ENUM = {
  BOOLEAN: "boolean",
  NUMERIC: "numeric",
  INTEGER: "integer",
  STRING: "string",
  JSON: "json",
};
//
export default class VicisData extends VicisConfig {
  /**
   * @name cache
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
  set cache(value) {
    //
  }
  get cache() {
    return this.#dataCache;
  }
  /**
   * @name setData
   * @public
   * @throws TypeError
   * @param {Object} data
   * @return {Vicis}
   */
  setData(data) {
    if (!isObjectLike(data)) {
      throw new TypeError("'data' should be an object");
    }
    this.#dataOriginal = data; // keep reference
    this.skipValidation = false;
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
    console.log("Validate Data");
    if (this.skipValidation) {
      this.skipValidation = false;
      return this;
    }
    this.#dataCache = {};
    Object.keys(this.#dataOriginal).forEach((key) => {
      if (this.config.omit.includes(key)) {
        return;
      }
      this.#dataCache[key] = this.#dataOriginal[key];
    });
    this.config.required.forEach((key) => {
      if (!(key in this.#dataCache)) {
        throw new Error(`Field '${key}' is required.`);
      }
    });
    this.config.defined.forEach((key) => {
      if (!(key in this.#dataCache)) {
        throw new Error(`Field '${key}' must be defined.`);
      }
      if (this.#dataCache[key] === undefined) {
        throw new Error(`Field '${key}' should have value.`);
      }
    });
    Object.keys(this.config.cast).forEach((key) => {
      const castTo = this.config.cast[key];
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
    Object.keys(this.config.transform).forEach((key) => {
      if (!(key in this.#dataCache)) {
        throw new Error(`Field '${key}' suppose to be transformed.`);
      }
      this.#dataCache[key] = this.config.transform[key](this.#dataCache[key], key);
    });
    Object.keys(this.config.replace).forEach((key) => {
      this.#dataCache[key] = this.config.replace[key];
    });
    const renameFrom = Object.keys(this.config.rename).sort((alpha, beta) => alpha.localeCompare(beta));
    const renamedData = {};
    renameFrom.forEach((key) => {
      if (!(key in this.#dataCache)) {
        throw new Error(`Field '${key}' suppose to be renamed.`);
      }
      renamedData[this.config.rename[key]] = this.#dataCache[key];
    });
    renameFrom.forEach((key) => {
      delete this.#dataCache[key];
    });
    Object.assign(this.#dataCache, renamedData);
    if (Object.keys(this.config.pick).length > 0) {
      let newCache = {};
      Object.keys(this.#dataCache).forEach((key) => {
        if (this.config.pick.includes(key)) {
          newCache[key] = this.#dataCache[key];
        }
      });
      this.#dataCache = newCache;
    }
    if (Object.keys(this.config.default).length > 0) {
      Object.keys(this.config.default).forEach((key) => {
        if (!(key in this.#dataCache) || this.#dataCache[key] === undefined) {
          this.#dataCache[key] = this.config.default[key];
        }
      });
    }
    this.#dataCache = castToJson(this.#dataCache, this.config.sort);
    return this;
  }
}
