import arrayBasicIntersect from "@corefunc/corefunc/array/basic/intersect.mjs";
import arrayGetDifference from "@corefunc/corefunc/array/get/difference.mjs";
import arrayHasSame from "@corefunc/corefunc/array/basic/hasSame.mjs";
import checkIsObjectLike from "@corefunc/corefunc/check/isObjectLike.mjs";
import isFunction from "@corefunc/corefunc/is/function.mjs";
import objectGetKeys from "@corefunc/corefunc/object/get/keys.mjs";

import CONFIG_FIELDS from "../const/configFields";
import CONFIG_SORT from "../const/configSort";

import castConfig from "./cast/castConfig";
import castData from "./cast/castData";
import castToJson from "../util/cast/toJson";
import clone from "../util/variable/clone";
import defaultsConfig from "./defaults/defaultsConfig";
import defaultsData from "./defaults/defaultsData";
import definedConfig from "./defined/definedConfig";
import definedData from "./defined/definedData";
import excludeConfig from "./exclude/excludeConfig";
import excludeData from "./exclude/excludeData";
import jsonStringify from "../util/json/stringify";
import omitConfig from "./omit/omitConfig";
import omitData from "./omit/omitData";
import orderConfig from "./order/orderConfig";
import orderData from "./order/orderData";
import pickConfig from "./pick/pickConfig";
import pickData from "./pick/pickData";
import renameConfig from "./rename/renameConfig";
import renameData from "./rename/renameData";
import replaceConfig from "./replace/replaceConfig";
import replaceData from "./replace/replaceData";
import requiredConfig from "./required/requiredConfig";
import requiredData from "./required/requiredData";
import transformConfig from "./transform/transformConfig";
import transformData from "./transform/transformData";

export default class Vicis {
  //#region Config Fields
  /**
   * @name cast
   * @private
   * @type {Object}
   */
  #cast = {};
  /**
   * @name defaults
   * @private
   * @type {Object}
   */
  #defaults = [];
  /**
   * @name defined
   * @private
   * @type {Array.<string>}
   */
  #defined = [];
  /**
   * @name exclude
   * @private
   * @type {Array.<string|RegExp>}
   */
  #exclude = [];
  /**
   * @name omit
   * @private
   * @type {Array.<string>}
   */
  #omit = [];
  /**
   * @name order
   * @private
   * @type {Array.<string>}
   */
  #order = [];
  /**
   * @name pick
   * @private
   * @type {Array.<string>}
   */
  #pick = [];
  /**
   * @name sort
   * @private
   * @type {boolean}
   */
  #sort = CONFIG_SORT;
  /**
   * @name rename
   * @private
   * @type {Object}
   */
  #rename = {};
  /**
   * @name replace
   * @private
   * @type {Object}
   */
  #replace = {};
  /**
   * @name required
   * @private
   * @type {Array.<string>}
   */
  #required = [];
  /**
   * @name transform
   * @private
   * @type {Object}
   */
  #transform = {};
  //#endregion

  //#region Data Fields
  /**
   * @name dataCache
   * @private
   * @type {Object}
   */
  #dataCache = {};
  /**
   * @name dataOriginal
   * @private
   * @type {Object}
   */
  #dataOriginal = undefined;
  //#endregion

  //#region Private Methods
  /**
   * @name validateConfig
   * @private
   * @method
   * @throws Error
   * @returns {Vicis}
   */
  #validateConfig;
  /**
   * @name validateData
   * @private
   * @method
   * @throws Error
   * @returns {Vicis}
   */
  #validateData;
  //#endregion

  //#region Initialization Methods
  /**
   * @name constructor
   * @public
   * @constructor
   * @param {Object=} config
   * @param {Object=} data
   */
  constructor(config = {}, data) {
    /**
     * @name validateConfig
     * @private
     * @method
     * @throws Error
     * @returns {Vicis}
     */
    this.#validateConfig = function validateConfig() {
      const cast = objectGetKeys(this.#cast);
      const rename = objectGetKeys(this.#rename);
      const replace = objectGetKeys(this.#replace);
      const transform = objectGetKeys(this.#transform);
      if (arrayHasSame(this.#omit, cast)) {
        throw new Error(`'omit' has same keys as 'cast': ${arrayBasicIntersect(this.#omit, cast)}.`);
      }
      if (arrayHasSame(this.#omit, this.#defined)) {
        throw new Error(`'omit' has same keys as 'defined': ${arrayBasicIntersect(this.#omit, this.#defined)}.`);
      }
      if (arrayHasSame(this.#omit, this.#pick)) {
        throw new Error(`'omit' has same keys as 'pick': ${arrayBasicIntersect(this.#omit, this.#pick)}.`);
      }
      if (arrayHasSame(this.#omit, rename)) {
        throw new Error(`'omit' has same keys as 'rename': ${arrayBasicIntersect(this.#omit, rename)}.`);
      }
      if (arrayHasSame(this.#omit, replace)) {
        throw new Error(`'omit' has same keys as 'replace': ${arrayBasicIntersect(this.#omit, replace)}.`);
      }
      if (arrayHasSame(this.#omit, this.#required)) {
        throw new Error(`'omit' has same keys as 'required': ${arrayBasicIntersect(this.#omit, this.#required)}.`);
      }
      if (arrayHasSame(this.#omit, transform)) {
        throw new Error(`'omit' has same keys as 'transform': ${arrayBasicIntersect(this.#omit, transform)}.`);
      }
      if (arrayHasSame(this.#omit, transform)) {
        throw new Error(`'omit' has same keys as 'transform': ${arrayBasicIntersect(this.#omit, transform)}.`);
      }
      if (arrayHasSame(cast, replace)) {
        throw new Error(`'cast' has same keys as 'replace': ${arrayBasicIntersect(cast, replace)}.`);
      }
      if (arrayHasSame(cast, transform)) {
        throw new Error(`'cast' has same keys as 'transform': ${arrayBasicIntersect(cast, transform)}.`);
      }
      if (arrayHasSame(replace, transform)) {
        throw new Error(`'replace' has same keys as 'transform': ${arrayBasicIntersect(replace, transform)}.`);
      }
      return this;
    }.bind(this);
    /**
     * @name validateData
     * @private
     * @method
     * @throws Error
     * @returns {Vicis}
     */
    this.#validateData = function validateData() {
      if (this.#dataOriginal === undefined) {
        return this;
      }
      if ("toObject" in this.#dataOriginal && isFunction(this.#dataOriginal.toObject)) {
        this.#dataCache = this.#dataOriginal.toObject();
      } else if ("toJSON" in this.#dataOriginal && isFunction(this.#dataOriginal.toJSON)) {
        this.#dataCache = this.#dataOriginal.toJSON();
      } else {
        this.#dataCache = this.#dataOriginal;
      }
      this.#dataCache = omitData(this.#omit, this.#dataCache);
      this.#dataCache = requiredData(this.#required, this.#dataCache);
      this.#dataCache = definedData(this.#defined, this.#dataCache);
      this.#dataCache = castData(this.#cast, this.#dataCache);
      this.#dataCache = transformData(this.#transform, this.#dataCache);
      this.#dataCache = replaceData(this.#replace, this.#dataCache);
      this.#dataCache = renameData(this.#rename, this.#dataCache);
      this.#dataCache = defaultsData(this.#defaults, this.#dataCache);
      this.#dataCache = pickData(this.#pick, this.#dataCache);
      this.#dataCache = excludeData(this.#exclude, this.#dataCache);
      this.#dataCache = castToJson(this.#dataCache, this.#sort);
      this.#dataCache = orderData(this.#order, this.#dataCache, this.#sort);
      return this;
    }.bind(this);
    this.config(config);
    if (data !== undefined) {
      this.data(data);
    }
  }
  //#endregion

  //#region Static Methods
  /**
   * @name factory
   * @public
   * @static
   * @factory
   * @param {Object=} config
   * @param {Object=} data
   * @returns {Vicis}
   */
  static factory(config = {}, data) {
    return new Vicis(config, data);
  }
  /**
   * @name from
   * @public
   * @static
   * @throws TypeError
   * @param {Object} data
   * @param {Object=} config
   * @returns {Object}
   */
  static from(data, config = {}) {
    return Vicis.factory(config, data).getData();
  }
  /**
   * @name fromArray
   * @static
   * @public
   * @param {Array.<Object>} collection
   * @param {Object=} config
   * @returns {Array.<Object>}
   */
  static fromArray(collection, config = {}) {
    const serializer = Vicis.factory(config);
    return Array.from(collection).map((data) => serializer.data(data).getData());
  }
  /**
   * @name BOOLEAN
   * @public
   * @static
   * @type {String}
   */
  static get BOOLEAN() {
    return "boolean";
  }
  /**
   * @name FLAG
   * @public
   * @static
   * @type {String}
   */
  static get FLAG() {
    return "flag";
  }
  /**
   * @name NUMERIC
   * @public
   * @static
   * @type {String}
   */
  static get NUMERIC() {
    return "numeric";
  }
  /**
   * @name INTEGER
   * @public
   * @static
   * @type {String}
   */
  static get INTEGER() {
    return "integer";
  }
  /**
   * @name STRING
   * @public
   * @static
   * @type {String}
   */
  static get STRING() {
    return "string";
  }
  /**
   * @name JSON
   * @public
   * @static
   * @type {String}
   */
  static get JSON() {
    return "json";
  }
  //#endregion

  //#region Public Config Methods
  /**
   * @name getConfig
   * @public
   * @returns {Object}
   */
  getConfig() {
    return clone({
      cast: this.#cast,
      defaults: this.#defaults,
      defined: this.#defined,
      exclude: this.#exclude,
      omit: this.#omit,
      order: this.#order,
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
   * @returns {Vicis}
   */
  resetConfig() {
    this.#cast = {};
    this.#defaults = {};
    this.#defined = [];
    this.#exclude = [];
    this.#omit = [];
    this.#order = [];
    this.#pick = [];
    this.#sort = CONFIG_SORT;
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
   * @param {Object=} config
   * @returns {Vicis}
   */
  config(config = {}) {
    if (!checkIsObjectLike(config)) {
      throw new TypeError("Config should be an object");
    }
    const diff = arrayGetDifference(objectGetKeys(config), CONFIG_FIELDS);
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
    this.exclude(config.exclude);
    this.order(config.order);
    this.#validateConfig();
    this.#validateData();
    return this;
  }
  /**
   * @name cast
   * @public
   * @throws TypeError
   * @param {Object=} propertyToType
   * @returns {Vicis}
   */
  cast(propertyToType = {}) {
    this.#cast = castConfig(propertyToType);
    this.#validateConfig();
    this.#validateData();
    return this;
  }
  /**
   * @name defaults
   * @public
   * @throws TypeError
   * @param {Object=} propertyDefaultValues
   * @returns {Vicis}
   */
  defaults(propertyDefaultValues = {}) {
    this.#defaults = defaultsConfig(propertyDefaultValues); // do not deep clone!
    this.#validateConfig();
    this.#validateData();
    return this;
  }
  /**
   * @name defined
   * @public
   * @throws TypeError
   * @param {Array.<string>=} propertiesMustBeDefined
   * @returns {Vicis}
   */
  defined(propertiesMustBeDefined = []) {
    this.#defined = definedConfig(propertiesMustBeDefined);
    this.#validateConfig();
    this.#validateData();
    return this;
  }
  /**
   * @name exclude
   * @public
   * @throws TypeError
   * @param {Array.<string|RegExp>=} propertiesToExclude
   * @returns {Vicis}
   */
  exclude(propertiesToExclude = []) {
    this.#exclude = excludeConfig(propertiesToExclude);
    this.#validateConfig();
    this.#validateData();
    return this;
  }
  /**
   * @name omit
   * @public
   * @throws TypeError
   * @param {Array.<string>=} propertiesToOmit
   * @returns {Vicis}
   */
  omit(propertiesToOmit = []) {
    this.#omit = omitConfig(propertiesToOmit);
    this.#validateConfig();
    this.#validateData();
    return this;
  }
  /**
   * @name order
   * @public
   * @throws TypeError
   * @param {Array.<string>=} propertiesToStreamline
   * @returns {Vicis}
   */
  order(propertiesToStreamline = []) {
    this.#order = orderConfig(propertiesToStreamline);
    this.#validateConfig();
    this.#validateData();
    return this;
  }
  /**
   * @name pick
   * @public
   * @throws TypeError
   * @param {Array.<string>=} propertiesToPick
   * @returns {Vicis}
   */
  pick(propertiesToPick = []) {
    this.#pick = pickConfig(propertiesToPick);
    this.#validateConfig();
    this.#validateData();
    return this;
  }
  /**
   * @name rename
   * @public
   * @throws TypeError
   * @param {Object=} renamePropertyFromTo
   * @returns {Vicis}
   */
  rename(renamePropertyFromTo = {}) {
    this.#rename = renameConfig(renamePropertyFromTo);
    this.#validateConfig();
    this.#validateData();
    return this;
  }
  /**
   * @name replace
   * @public
   * @throws TypeError
   * @param {Object=} replacePropertyValues
   * @returns {Vicis}
   */
  replace(replacePropertyValues = {}) {
    this.#replace = replaceConfig(replacePropertyValues); // do not deep clone!
    this.#validateConfig();
    this.#validateData();
    return this;
  }
  /**
   * @name required
   * @public
   * @throws TypeError
   * @param {Array.<string>=} propertiesRequired
   * @returns {Vicis}
   */
  required(propertiesRequired = []) {
    this.#required = requiredConfig(propertiesRequired);
    this.#validateConfig();
    this.#validateData();
    return this;
  }
  /**
   * @name sort
   * @public
   * @throws TypeError
   * @param {boolean=} sortProperties
   * @returns {Vicis}
   */
  sort(sortProperties = CONFIG_SORT) {
    if (typeof sortProperties !== "boolean") {
      throw new TypeError("'sort' should be a boolean");
    }
    this.#sort = sortProperties;
    this.#validateData();
    return this;
  }
  /**
   * @name transform
   * @public
   * @throws TypeError
   * @param {Object=} propertyValueTransformWith
   * @returns {Vicis}
   */
  transform(propertyValueTransformWith = {}) {
    this.#transform = transformConfig(propertyValueTransformWith); // do not deep clone!
    this.#validateConfig();
    this.#validateData();
    return this;
  }
  //#endregion

  //#region Public Data Methods
  /**
   * @name getData
   * @public
   * @returns {Object}
   */
  getData() {
    return clone(this.#dataCache);
  }
  /**
   * @name data
   * @public
   * @throws TypeError
   * @param {Object} dataToSerialize
   * @returns {Vicis}
   */
  data(dataToSerialize) {
    if (!checkIsObjectLike(dataToSerialize)) {
      throw new TypeError("Data should be an object");
    }
    this.#dataOriginal = dataToSerialize; // keep reference
    this.#validateData();
    return this;
  }
  /**
   * @name clear
   * @description Clear any data references and cached values
   * @public
   * @returns {Vicis}
   */
  clear() {
    this.#dataCache = {};
    this.#dataOriginal = undefined;
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
   * @returns {string}
   */
  toString() {
    return jsonStringify(this.toJSON());
  }
  /**
   * @name fromArray
   * @public
   * @param {Array.<Object>} collection
   * @returns {Array.<Object>}
   */
  fromArray(collection) {
    return Array.from(collection).map((data) => this.data(data).toJSON());
  }
  //#endregion
}
