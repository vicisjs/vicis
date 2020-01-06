import { arrayDiff } from "../helper/arrayDiff.mjs";
import { arrayHasSame } from "../helper/arrayHasSame.mjs";
import { arrayIntersect } from "../helper/arrayIntersect.mjs";
import { arrayUnique } from "../helper/arrayUnique.mjs";
import { isFunction } from "../helper/isFunction.mjs";
import { isObjectLike } from "../helper/isObjectLike.mjs";
import { isString } from "../helper/isString.mjs";
import { objectKeys } from "../helper/objectKeys.mjs";
//
const TYPES_LIST = ["boolean", "numeric", "integer", "string", "json"];
const CONFIG_DEFAULT = {
  cast: {},
  default: {},
  defined: [],
  omit: [],
  pick: [],
  sort: true,
  rename: {},
  replace: {},
  required: [],
  transform: {},
};
const CONFIG_FIELDS = [
  "cast",
  "default",
  "defined",
  "omit",
  "pick",
  "sort",
  "rename",
  "replace",
  "required",
  "transform",
];
//
export default class VicisConfig {
  /**
   * @name cast
   * @private
   * @type Object
   */
  #cast = {};
  /**
   * @name default
   * @private
   * @type Object
   */
  #default = [];
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
  /**
   * @name skipValidation
   * @private
   * @type Boolean
   */
  #skipConfigValidation = true;
  /**
   * @name constructor
   * @public
   * @constructor
   * @param {Object=} config
   */
  constructor(config = {}) {
    this.setConfig(config);
  }
  /**
   * @name skipValidation
   * @public
   * @param {Boolean} value
   * @type {Boolean}
   */
  set skipValidation(value) {
    this.#skipConfigValidation = Boolean(value);
  }
  /**
   * @name skipValidation
   * @public
   * @type {Boolean}
   */
  get skipValidation() {
    return this.#skipConfigValidation;
  }
  /**
   * @name config
   * @public
   * @type {{}}
   */
  get config() {
    return {
      cast: this.#cast,
      default: this.#default,
      defined: this.#defined,
      omit: this.#omit,
      pick: this.#pick,
      sort: this.#sort,
      rename: this.#rename,
      replace: this.#replace,
      required: this.#required,
      transform: this.#transform,
    };
  }
  /**
   * @name setConfig
   * @public
   * @throws TypeError
   * @param {Object<String, *>} config
   * @return {VicisConfig}
   */
  setConfig(config = {}) {
    if (!isObjectLike(config)) {
      throw new TypeError("'config' should be an object");
    }
    const diff = arrayDiff(objectKeys(config), CONFIG_FIELDS);
    if (diff.length) {
      throw new TypeError(`'config' has unknown fields: '${diff.join("', '")}'.`);
    }
    this.#cast = CONFIG_DEFAULT.cast;
    this.#default = CONFIG_DEFAULT.default;
    this.#defined = CONFIG_DEFAULT.defined;
    this.#omit = CONFIG_DEFAULT.omit;
    this.#pick = CONFIG_DEFAULT.pick;
    this.#sort = CONFIG_DEFAULT.sort;
    this.#rename = CONFIG_DEFAULT.rename;
    this.#replace = CONFIG_DEFAULT.replace;
    this.#required = CONFIG_DEFAULT.required;
    this.#transform = CONFIG_DEFAULT.transform;
    this.#skipConfigValidation = false;
    this.sort(config.sort);
    this.#skipConfigValidation = false;
    this.omit(config.omit);
    this.#skipConfigValidation = false;
    this.cast(config.cast);
    this.#skipConfigValidation = false;
    this.defined(config.defined);
    this.#skipConfigValidation = false;
    this.pick(config.pick);
    this.#skipConfigValidation = false;
    this.rename(config.rename);
    this.#skipConfigValidation = false;
    this.replace(config.replace);
    this.#skipConfigValidation = false;
    this.required(config.required);
    this.#skipConfigValidation = false;
    this.transform(config.transform);
    this.#skipConfigValidation = false;
    this.default(config.default);
    this.validateConfig();
    return this;
  }
  /**
   * @name cast
   * @public
   * @throws TypeError
   * @param {Object<String, String>} config
   * @return {VicisConfig}
   */
  cast(config = {}) {
    if (!isObjectLike(config)) {
      throw new TypeError("'cast' should be an object");
    }
    const newConfig = {};
    Object.keys(config).forEach((key) => {
      if (!isString(config[key])) {
        throw new TypeError(`'cast' expect object values to be strings. Not a string at key: '${config[key]}'.`);
      }
      if (!TYPES_LIST.includes(config[key])) {
        throw new TypeError(`'cast' has unknown type in {${key}: "${config[key]}"}.`);
      }
      newConfig[key] = config[key];
    });
    this.#cast = newConfig;
    this.#skipConfigValidation = false;
    this.validateConfig();
    return this;
  }
  /**
   * @name default
   * @protected
   * @throws TypeError
   * @param {Object<String, *>} config
   * @return {VicisConfig}
   */
  default(config = {}) {
    if (!isObjectLike(config)) {
      throw new TypeError("'default' should be an object");
    }
    this.#default = { ...config };
    this.#skipConfigValidation = false;
    this.validateConfig();
    return this;
  }
  /**
   * @name defined
   * @public
   * @throws TypeError
   * @param {String[]} config
   * @return {VicisConfig}
   */
  defined(config = []) {
    if (!Array.isArray(config)) {
      throw new TypeError("'defined' should be an array");
    }
    this.#defined = arrayUnique(config).map((value) => {
      if (!isString(value)) {
        throw new TypeError(`'defined' expect array of strings. Value: '${value.toString()}'.`);
      }
      return value;
    });
    this.#skipConfigValidation = false;
    this.validateConfig();
    return this;
  }
  /**
   * @name omit
   * @public
   * @throws TypeError
   * @param {String[]} config
   * @return {VicisConfig}
   */
  omit(config = []) {
    if (!Array.isArray(config)) {
      throw new TypeError("'omit' should be an array");
    }
    this.#omit = arrayUnique(config).map((value) => {
      if (!isString(value)) {
        throw new TypeError(`'omit' expect array of strings. Value: '${value.toString()}'.`);
      }
      return value;
    });
    this.#skipConfigValidation = false;
    this.validateConfig();
    return this;
  }
  /**
   * @name pick
   * @public
   * @throws TypeError
   * @param {String[]} config
   * @return {VicisConfig}
   */
  pick(config = []) {
    if (!Array.isArray(config)) {
      throw new TypeError("'pick' should be an array");
    }
    this.#pick = arrayUnique(config).map((value) => {
      if (!isString(value)) {
        throw new TypeError(`'pick' expect array of strings. Value: '${value.toString()}'.`);
      }
      return value;
    });
    this.#skipConfigValidation = false;
    this.validateConfig();
    return this;
  }
  /**
   * @name rename
   * @public
   * @throws TypeError
   * @param {Object<String, Function>} config
   * @return {VicisConfig}
   */
  rename(config = {}) {
    if (!isObjectLike(config)) {
      throw new TypeError("'rename' should be an object");
    }
    const newConfig = {};
    Object.keys(config).forEach((key) => {
      if (!isString(key)) {
        throw new TypeError(`'rename' expect object values to be strings. Not a string at key: '${key}'.`);
      }
      newConfig[key] = config[key];
    });
    const rename = Object.values(this.#rename);
    const renameTo = arrayIntersect(rename, arrayUnique(rename));
    if (rename.length !== renameTo.length) {
      throw new Error(`'rename' has similar values: ${renameTo.join(",")}.`);
    }
    this.#rename = newConfig;
    this.#skipConfigValidation = false;
    this.validateConfig();
    return this;
  }
  /**
   * @name replace
   * @public
   * @throws TypeError
   * @param {Object<String, *>} config
   * @return {VicisConfig}
   */
  replace(config = {}) {
    if (!isObjectLike(config)) {
      throw new TypeError("'replace' should be an object");
    }
    this.#replace = { ...config };
    this.#skipConfigValidation = false;
    this.validateConfig();
    return this;
  }
  /**
   * @name required
   * @public
   * @throws TypeError
   * @param {String[]} config
   * @return {VicisConfig}
   */
  required(config = []) {
    if (!Array.isArray(config)) {
      throw new TypeError("'required' should be an array");
    }
    this.#required = arrayUnique(config).map((value) => {
      if (!isString(value)) {
        throw new TypeError(`'required' expect array of strings. Value: '${value.toString()}'.`);
      }
      return value;
    });
    this.#skipConfigValidation = false;
    this.validateConfig();
    return this;
  }
  /**
   * @name sort
   * @public
   * @throws TypeError
   * @param {Boolean} config
   * @return {VicisConfig}
   */
  sort(config = true) {
    if (typeof config !== "boolean"){
      throw new TypeError("'sort' should be a boolean");
    }
    this.#sort = config;
    return this;
  }
  /**
   * @name transform
   * @public
   * @throws TypeError
   * @param {Object<String, Function>} config
   * @return {VicisConfig}
   */
  transform(config = {}) {
    if (!isObjectLike(config)) {
      throw new TypeError("'transform' should be an object");
    }
    const newConfig = {};
    Object.keys(config).forEach((key) => {
      if (!isFunction(config[key])) {
        throw new TypeError(`'transform' expect object values to be functions. Not a function at key: '${key}'.`);
      }
      newConfig[key] = config[key];
    });
    this.#transform = newConfig;
    this.#skipConfigValidation = false;
    this.validateConfig();
    return this;
  }
  /**
   * @name validateConfig
   * @protected
   * @throws Error
   * @return {VicisConfig}
   */
  validateConfig() {
    console.log("Validate Config");

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
}
