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
 * @param {Array} alpha
 * @param {Array} beta
 * @returns {Array}
 */
function arrayDiff(alpha, beta) {
  const set = new Set(beta);
  return alpha.filter((value) => !set.has(value));
}
/**
 * @name arrayHasSame
 * @param {Array} alpha
 * @param {Array} beta
 * @returns {boolean}
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
 * @param {Array} alpha
 * @param {Array} beta
 * @returns {Array}
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
 * @param {Array} array
 * @returns {Array}
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
      const normalized = [...new Set(strings.map((value) => value.normalize()))];
      normalized.forEach((value) => {
        delete unique[unique.indexOf(value)];
      });
      const compacted = [];
      for (let index = 0; index < unique.length; index += 1) {
        if (index in unique) {
          compacted.push(unique[index]);
        }
      }
      unique = compacted.concat(normalized);
    }
  }
  return unique.sort();
}
/**
 * @name castToJson
 * @param {*} value
 * @param {boolean=true} sort
 * @returns {*}
 */
function castToJson(value, sort = true) {
  if (sort) {
    return collectionSortKeys(parse(stringify(value)), true);
  } else {
    return parse(stringify(value));
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
 * name isArrayEmpty
 * @param {Array} array
 * @returns {boolean}
 */
function isArrayEmpty(array) {
  return array.length === 0;
}
/**
 * @name isFunction
 * @param {*} value
 * @returns {boolean}
 */
function isFunction(value) {
  return Object.prototype.toString.call(value) === "[object Function]";
}
/**
 * name isObjectEmpty
 * @param {Object} object
 * @returns {boolean}
 */
function isObjectEmpty(object) {
  return Object.keys(object).length === 0;
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
 * @name isString
 * @param {*} value
 * @returns {boolean}
 */
function isString(value) {
  return typeof value === "string";
}
/**
 * @name objectKeys
 * @param {Object} object
 * @returns {Array.<string>}
 */
function objectKeys(object) {
  return Object.keys(object).sort((alpha, beta) => alpha.localeCompare(beta));
}
/**
 * @name parse
 * @param {string} text
 * @returns *
 */
function parse(text) {
  return JSON.parse(text);
}
/**
 * @name stringify
 * @param {*} value
 * @returns string
 */
function stringify(value) {
  return JSON.stringify(value);
}
/**
 * @name toString
 * @param {*} value
 * @returns string
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

//#region Mixin Functions

//#region Cast
/**
 * @name castConfig
 * @throws TypeError
 * @param {Object.<string, string>} propertyToType
 * @returns {Object}
 */
function castConfig(propertyToType) {
  if (!isObjectLike(propertyToType)) {
    throw new TypeError("Cast should be an object");
  }
  if (isObjectEmpty(propertyToType)) {
    return {};
  }
  Object.keys(propertyToType).forEach((key) => {
    if (!isString(propertyToType[key])) {
      throw new TypeError(
        `'Cast' expect object values to be strings. Not a string at key: '${stringify(propertyToType[key])}'.`,
      );
    }
    if (!TYPES_LIST.includes(propertyToType[key])) {
      throw new TypeError(`'Cast' has unknown type in {${key}: "${propertyToType[key]}"}.`);
    }
  });
  return propertyToType;
}
/**
 * @name castData
 * @param {Object.<string, string>} propertyToType
 * @param {Object} dataToSerialize
 * @returns {Object}
 */
function castData(propertyToType, dataToSerialize) {
  if (isObjectEmpty(propertyToType)) {
    return dataToSerialize;
  }
  Object.keys(propertyToType).forEach((key) => {
    const castTo = propertyToType[key];
    if (!(key in dataToSerialize)) {
      throw new Error(`Field '${key}' suppose to be converted to ${castTo}.`);
    }
    switch (castTo) {
      case TYPES_ENUM.BOOLEAN:
        dataToSerialize[key] = Boolean(dataToSerialize[key]);
        break;
      case TYPES_ENUM.NUMERIC: {
        const castedNumber = Number(dataToSerialize[key]);
        if (Number.isFinite(castedNumber)) {
          dataToSerialize[key] = castedNumber;
        } else {
          const parsed = Number.parseFloat(dataToSerialize[key]);
          if (Number.isFinite(parsed)) {
            dataToSerialize[key] = parsed;
          } else {
            dataToSerialize[key] = 0;
          }
        }
        break;
      }
      case TYPES_ENUM.INTEGER: {
        const castedInteger = Number(dataToSerialize[key]);
        if (Number.isFinite(castedInteger)) {
          dataToSerialize[key] = Math.trunc(castedInteger);
        } else {
          const parsed = Number.parseFloat(dataToSerialize[key]);
          if (Number.isFinite(parsed)) {
            dataToSerialize[key] = Math.trunc(castedInteger);
          } else {
            dataToSerialize[key] = 0;
          }
        }
        break;
      }
      case TYPES_ENUM.STRING:
        dataToSerialize[key] = toString(dataToSerialize[key]);
        break;
      case TYPES_ENUM.JSON:
        dataToSerialize[key] = parse(stringify(dataToSerialize[key]));
        break;
      default:
        throw new Error("Unknown value convert error");
    }
  });
  return dataToSerialize;
}
/**
 * @name cast
 * @throws TypeError
 * @param {Object} data
 * @param {Object.<string, string>=} propertyToType
 * @returns {Object}
 */
function cast(data, propertyToType = {}) {
  const config = castConfig(propertyToType);
  if (isObjectEmpty(config)) {
    return data;
  }
  return castData(config, data);
}
//#endregion

//#region Defaults
/**
 * @name defaultsConfig
 * @throws TypeError
 * @param {Object.<string, *>} propertyDefaultValues
 * @returns {Object}
 */
function defaultsConfig(propertyDefaultValues) {
  if (!isObjectLike(propertyDefaultValues)) {
    throw new TypeError("'Defaults' should be an object");
  }
  return propertyDefaultValues;
}
/**
 * @name defaultsData
 * @param {Object.<string, *>} propertyDefaultValues
 * @param {Object} dataToSerialize
 * @returns {Object}
 */
function defaultsData(propertyDefaultValues, dataToSerialize) {
  if (isObjectEmpty(propertyDefaultValues)) {
    return dataToSerialize;
  }
  Object.keys(propertyDefaultValues).forEach((key) => {
    if (!(key in dataToSerialize) || dataToSerialize[key] === undefined) {
      dataToSerialize[key] = propertyDefaultValues[key];
    }
  });
  return dataToSerialize;
}
/**
 * @name defaults
 * @throws TypeError
 * @param {Object} data
 * @param {Object.<string, *>=} propertyDefaultValues
 * @returns {Object}
 */
function defaults(data, propertyDefaultValues = {}) {
  const config = defaultsConfig(propertyDefaultValues);
  if (isObjectEmpty(config)) {
    return data;
  }
  return defaultsData(propertyDefaultValues, data);
}
//#endregion

//#region Defined
/**
 * @name definedConfig
 * @throws TypeError
 * @param {Array.<string>} propertiesMustBeDefined
 * @returns {Array.<string>}
 */
function definedConfig(propertiesMustBeDefined) {
  if (!Array.isArray(propertiesMustBeDefined)) {
    throw new TypeError("'Defined' should be an array");
  }
  if (isArrayEmpty(propertiesMustBeDefined)) {
    return [];
  }
  return arrayUnique(propertiesMustBeDefined).map((value) => {
    if (!isString(value)) {
      throw new TypeError(`'Defined' expect array of strings. Value: '${stringify(value)}'.`);
    }
    return value;
  });
}
/**
 * @name definedData
 * @throws TypeError
 * @param {Array.<string>} propertiesMustBeDefined
 * @param {Object} dataToSerialize
 * @returns {Object}
 */
function definedData(propertiesMustBeDefined, dataToSerialize) {
  const config = definedConfig(propertiesMustBeDefined);
  if (isArrayEmpty(config)) {
    return dataToSerialize;
  }
  config.forEach((key) => {
    if (!(key in dataToSerialize)) {
      throw new Error(`Field '${key}' must be defined.`);
    }
    if (dataToSerialize[key] === undefined) {
      throw new Error(`Field '${key}' should have value.`);
    }
  });
  return dataToSerialize;
}
/**
 * @name defined
 * @throws TypeError
 * @param {Object} data
 * @param {Array.<string>=} propertiesMustBeDefined
 * @returns {Object}
 */
function defined(data, propertiesMustBeDefined = []) {
  if (isArrayEmpty(propertiesMustBeDefined)) {
    return data;
  }
  return definedData(propertiesMustBeDefined, data);
}
//#endregion

//#region Omit
/**
 * @name omitConfig
 * @throws TypeError
 * @param {Array.<string>} propertiesToOmit
 * @returns {Array.<string>}
 */
function omitConfig(propertiesToOmit) {
  if (!Array.isArray(propertiesToOmit)) {
    throw new TypeError("'Omit' should be an array");
  }
  if (isArrayEmpty(propertiesToOmit)) {
    return [];
  }
  return arrayUnique(propertiesToOmit).map((value) => {
    if (!isString(value)) {
      throw new TypeError(`'Omit' expect array of strings. Value: '${stringify(value)}'.`);
    }
    return value;
  });
}
/**
 * @name omitData
 * @param {Array.<string>} propertiesToOmit
 * @param {Object} data
 * @returns {Object}
 */
function omitData(propertiesToOmit, data) {
  if (isArrayEmpty(propertiesToOmit)) {
    return data;
  }
  const dataToSerialize = {};
  Object.keys(data).forEach((key) => {
    if (propertiesToOmit.includes(key)) {
      return;
    }
    dataToSerialize[key] = data[key];
  });
  return dataToSerialize;
}
/**
 * @name omit
 * @throws TypeError
 * @param {Object} data
 * @param {Array.<string>=} propertiesToOmit
 * @returns {Object}
 */
function omit(data, propertiesToOmit = []) {
  const config = omitConfig(propertiesToOmit);
  if (isArrayEmpty(config)) {
    return data;
  }
  const dataToSerialize = {};
  Object.keys(data).forEach((key) => {
    if (config.includes(key)) {
      return;
    }
    dataToSerialize[key] = data[key];
  });
  return dataToSerialize;
}
//#endregion

//#region Pick
/**
 * @name pickConfig
 * @throws TypeError
 * @param {Array.<string>} propertiesToPick
 * @returns {Array.<string>}
 */
function pickConfig(propertiesToPick) {
  if (!Array.isArray(propertiesToPick)) {
    throw new TypeError("'Pick' should be an array");
  }
  if (isArrayEmpty(propertiesToPick)) {
    return [];
  }
  return arrayUnique(propertiesToPick).map((value) => {
    if (!isString(value)) {
      throw new TypeError(`'Pick' expect array of strings. Value: '${stringify(value)}'.`);
    }
    return value;
  });
}
/**
 * @name pickData
 * @param {Array.<string>} propertiesToPick
 * @param {Object} dataToSerialize
 * @returns {Object}
 */
function pickData(propertiesToPick, dataToSerialize) {
  if (isArrayEmpty(propertiesToPick)) {
    return dataToSerialize;
  }
  const newCache = {};
  Object.keys(dataToSerialize).forEach((key) => {
    if (propertiesToPick.includes(key)) {
      newCache[key] = dataToSerialize[key];
    }
  });
  return newCache;
}
/**
 * @name pick
 * @throws TypeError
 * @param {Object} data
 * @param {Array.<string>=} propertiesToPick
 * @returns {Object}
 */
function pick(data, propertiesToPick = []) {
  const config = pickConfig(propertiesToPick);
  if (isArrayEmpty(config)) {
    return data;
  }
  return pickData(config, data);
}
//#endregion

//#region Rename
/**
 * @name renameConfig
 * @throws TypeError
 * @param {Object.<string, string>} renamePropertyFromTo
 * @returns {Object}
 */
function renameConfig(renamePropertyFromTo) {
  if (!isObjectLike(renamePropertyFromTo)) {
    throw new TypeError("'Rename' should be an object");
  }
  if (isObjectEmpty(renamePropertyFromTo)) {
    return {};
  }
  Object.keys(renamePropertyFromTo).forEach((key) => {
    if (!isString(key)) {
      throw new TypeError(`'Rename' expect object values to be strings. Not a string at key: '${key}'.`);
    }
  });
  const to = Object.values(renamePropertyFromTo);
  const toUnique = arrayUnique(to);
  if (to.length !== toUnique.length) {
    throw new TypeError(`'Rename' has similar values: '${stringify(toUnique)}'.`);
  }
  return renamePropertyFromTo;
}
/**
 * @name renameData
 * @param {Object.<string, string>} renamePropertyFromTo
 * @param {Object} dataToSerialize
 * @returns {Object}
 */
function renameData(renamePropertyFromTo, dataToSerialize) {
  if (isObjectEmpty(renamePropertyFromTo)) {
    return dataToSerialize;
  }
  const renameFrom = Object.keys(renamePropertyFromTo).sort((alpha, beta) => alpha.localeCompare(beta));
  const renamedData = {};
  renameFrom.forEach((key) => {
    if (!(key in dataToSerialize)) {
      throw new Error(`Field '${key}' suppose to be renamed.`);
    }
    renamedData[renamePropertyFromTo[key]] = dataToSerialize[key];
  });
  renameFrom.forEach((key) => {
    delete dataToSerialize[key];
  });
  Object.assign(dataToSerialize, renamedData);
  return dataToSerialize;
}
/**
 * @name rename
 * @param {Object} data
 * @param {Object.<string, string>=} renamePropertyFromTo
 * @returns {Object}
 */
function rename(data, renamePropertyFromTo = {}) {
  const config = renameConfig(renamePropertyFromTo);
  if (isObjectEmpty(config)) {
    return data;
  }
  return renameData(config, data);
}
//#endregion

//#region Replace
/**
 * @name replaceConfig
 * @throws TypeError
 * @param {Object.<string, *>} replacePropertyValues
 * @returns {Object}
 */
function replaceConfig(replacePropertyValues) {
  if (!isObjectLike(replacePropertyValues)) {
    throw new TypeError("'Replace' should be an object");
  }
  return replacePropertyValues;
}
/**
 * @name replaceData
 * @param {Object.<string, *>} replacePropertyValues
 * @param {Object} dataToSerialize
 * @returns {Object}
 */
function replaceData(replacePropertyValues, dataToSerialize) {
  if (isObjectEmpty(replacePropertyValues)) {
    return dataToSerialize;
  }
  Object.keys(replacePropertyValues).forEach((key) => {
    dataToSerialize[key] = replacePropertyValues[key];
  });
  return dataToSerialize;
}
/**
 * @name replace
 * @throws TypeError
 * @param {Object} data
 * @param {Object.<string, *>=} replacePropertyValues
 * @returns {Object}
 */
function replace(data, replacePropertyValues = {}) {
  const config = replaceConfig(replacePropertyValues);
  if (isObjectEmpty(config)) {
    return data;
  }
  return replaceData(config, data);
}
//#endregion

//#region Required
/**
 * @name requiredConfig
 * @throws TypeError
 * @param {Array.<string>} propertiesRequired
 * @returns {Array.<string>}
 */
function requiredConfig(propertiesRequired) {
  if (!Array.isArray(propertiesRequired)) {
    throw new TypeError("'Required' should be an array");
  }
  if (isArrayEmpty(propertiesRequired)) {
    return [];
  }
  return arrayUnique(propertiesRequired).map((value) => {
    if (!isString(value)) {
      throw new TypeError(`'Required' expect array of strings. Value: '${stringify(value)}'.`);
    }
    return value;
  });
}
/**
 * @name requiredData
 * @param {Array.<string>} propertiesRequired
 * @param {Object} dataToSerialize
 * @returns {Object}
 */
function requiredData(propertiesRequired, dataToSerialize) {
  if (isArrayEmpty(propertiesRequired)) {
    return dataToSerialize;
  }
  propertiesRequired.forEach((key) => {
    if (!(key in dataToSerialize)) {
      throw new Error(`Field '${key}' is required.`);
    }
  });
  return dataToSerialize;
}
/**
 * @name required
 * @throws TypeError
 * @param {Object} data
 * @param {Array.<string>=} propertiesRequired
 * @returns {Object}
 */
function required(data, propertiesRequired = []) {
  const config = requiredConfig(propertiesRequired);
  if (isArrayEmpty(config)) {
    return data;
  }
  return requiredData(config, data);
}
//#endregion

//#region Transform
/**
 * @name transformConfig
 * @throws TypeError
 * @param {Object.<string, function>} propertyValueTransformWith
 * @returns {Object}
 */
function transformConfig(propertyValueTransformWith) {
  if (!isObjectLike(propertyValueTransformWith)) {
    throw new TypeError("'Transform' should be an object");
  }
  if (isObjectEmpty(propertyValueTransformWith)) {
    return {};
  }
  Object.keys(propertyValueTransformWith).forEach((key) => {
    if (!isFunction(propertyValueTransformWith[key])) {
      throw new TypeError(`'Transform' expect object values to be functions. Not a function at key: '${key}'.`);
    }
  });
  return propertyValueTransformWith;
}
/**
 * @name transformData
 * @param {Object.<string, function>} propertyValueTransformWith
 * @param {Object} dataToSerialize
 * @returns {Object}
 */
function transformData(propertyValueTransformWith, dataToSerialize) {
  if (isObjectEmpty(propertyValueTransformWith)) {
    return dataToSerialize;
  }
  Object.keys(propertyValueTransformWith).forEach((key) => {
    if (!(key in dataToSerialize)) {
      throw new Error(`Field '${key}' suppose to be transformed.`);
    }
    dataToSerialize[key] = propertyValueTransformWith[key](dataToSerialize[key], key, clone(dataToSerialize));
  });
  return dataToSerialize;
}
/**
 * @name transform
 * @param {Object} data
 * @param {Object.<string, function>=} propertyValueTransformWith
 * @returns {Object}
 */
function transform(data, propertyValueTransformWith = {}) {
  const config = transformConfig(propertyValueTransformWith);
  if (isObjectEmpty(config)) {
    return data;
  }
  return transformData(config, data);
}
//#endregion

//#endregion

//#region Class
class Vicis {
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
   * @name pick
   * @private
   * @type {Array.<string>}
   */
  #omit = [];
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
  #sort = true;
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
  #dataOriginal = {};
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
    }.bind(this);
    /**
     * @name validateData
     * @private
     * @method
     * @throws Error
     * @returns {Vicis}
     */
    this.#validateData = function validateData() {
      this.#dataCache = {};
      this.#dataCache = omitData(this.#omit, this.#dataOriginal);
      this.#dataCache = requiredData(this.#required, this.#dataCache);
      this.#dataCache = definedData(this.#defined, this.#dataCache);
      this.#dataCache = castData(this.#cast, this.#dataCache);
      this.#dataCache = transformData(this.#transform, this.#dataCache);
      this.#dataCache = replaceData(this.#replace, this.#dataCache);
      this.#dataCache = renameData(this.#rename, this.#dataCache);
      this.#dataCache = defaultsData(this.#defaults, this.#dataCache);
      this.#dataCache = pickData(this.#pick, this.#dataCache);
      this.#dataCache = castToJson(this.#dataCache, this.#sort);
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
   * @name BOOLEAN
   * @public
   * @static
   * @type {String}
   */
  static get BOOLEAN() {
    return "boolean";
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
   * @returns {Vicis}
   */
  resetConfig() {
    this.#cast = {};
    this.#defaults = {};
    this.#defined = [];
    this.#omit = [];
    this.#pick = [];
    this.#sort = true;
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
    this.#validateConfig();
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
    return this;
  }
  /**
   * @name sort
   * @public
   * @throws TypeError
   * @param {boolean=} sortProperties
   * @returns {Vicis}
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
   * @param {Object=} propertyValueTransformWith
   * @returns {Vicis}
   */
  transform(propertyValueTransformWith = {}) {
    this.#transform = transformConfig(propertyValueTransformWith); // do not deep clone!
    this.#validateConfig();
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
    if (!isObjectLike(dataToSerialize)) {
      throw new TypeError("Data should be an object");
    }
    this.#dataOriginal = dataToSerialize; // keep reference
    this.#validateData();
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
    return stringify(this.toJSON());
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
//#endregion

export default Vicis;

export { TYPES_ENUM, Vicis, cast, defaults, defined, omit, pick, rename, replace, required, transform };
