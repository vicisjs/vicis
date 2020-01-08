import { arrayDiff } from "../helper/arrayDiff.mjs";
import { arrayHasSame } from "../helper/arrayHasSame.mjs";
import { arrayIntersect } from "../helper/arrayIntersect.mjs";
import { arrayUnique } from "../helper/arrayUnique.mjs";
import { clone } from "../helper/clone.mjs";
import { isFunction } from "../helper/isFunction.mjs";
import { isObjectLike } from "../helper/isObjectLike.mjs";
import { isString } from "../helper/isString.mjs";
import { objectKeys } from "../helper/objectKeys.mjs";

const TYPES_LIST = ["boolean", "numeric", "integer", "string", "json"];

const CONFIG_DEFAULT = {
  cast: {},
  defaults: {},
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
//
export default class VicisConfig {
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
  /**
   * @name constructor
   * @public
   * @constructor
   * @param {Object=} config
   */
  constructor(config = {}) {
    this.config(config);
  }
  /**
   * @name getConfig
   * @public
   * @type {{}}
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
   * @return {VicisConfig}
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
   * @return {VicisConfig}
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
   * @return {VicisConfig}
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
   * @return {VicisConfig}
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
   * @return {VicisConfig}
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
   * @return {VicisConfig}
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
   * @return {VicisConfig}
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
   * @return {VicisConfig}
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
   * @return {VicisConfig}
   */
  replace(overrideValues = {}) {
    if (!isObjectLike(overrideValues)) {
      throw new TypeError("'replace' should be an object");
    }
    this.#replace = { ...overrideValues };
    this.validateConfig();
    return this;
  }
  /**
   * @name required
   * @public
   * @throws TypeError
   * @param {String[]} propsRequired
   * @return {VicisConfig}
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
   * @return {VicisConfig}
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
   * @return {VicisConfig}
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
   * @return {VicisConfig}
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
}
