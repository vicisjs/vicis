import cloneDeep from 'lodash.clonedeep';

function _classPrivateFieldGet(receiver, privateMap) {
  var descriptor = privateMap.get(receiver);

  if (!descriptor) {
    throw new TypeError("attempted to get private field on non-instance");
  }

  if (descriptor.get) {
    return descriptor.get.call(receiver);
  }

  return descriptor.value;
}

function _classPrivateFieldSet(receiver, privateMap, value) {
  var descriptor = privateMap.get(receiver);

  if (!descriptor) {
    throw new TypeError("attempted to set private field on non-instance");
  }

  if (descriptor.set) {
    descriptor.set.call(receiver, value);
  } else {
    if (!descriptor.writable) {
      throw new TypeError("attempted to set read only private field");
    }

    descriptor.value = value;
  }

  return value;
}

const CONFIG_FIELDS = ["cast", "defaults", "defined", "exclude", "omit", "order", "pick", "sort", "rename", "replace", "required", "transform"];
const TYPES_ENUM = {
  BOOLEAN: "boolean",
  FLAG: "flag",
  NUMERIC: "numeric",
  INTEGER: "integer",
  STRING: "string",
  JSON: "json"
};
const TYPES_LIST = ["boolean", "flag", "numeric", "integer", "string", "json"];
const CONFIG_SORT = false; //#endregion
//#region Helper Functions

/**
 * @name arrayDiff
 * @param {Array} alpha
 * @param {Array} beta
 * @returns {Array}
 */

function arrayDiff(alpha, beta) {
  const set = new Set(beta);
  return alpha.filter(value => !set.has(value));
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
  return [...new Set(alpha)].filter(x => setB.has(x)).length > 0;
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
  return [...new Set(alpha)].filter(x => setB.has(x));
}
/**
 * @name arrayUnique
 * @param {Array} array
 * @param {boolean=} sort
 * @returns {Array}
 */


function arrayUnique(array, sort = true) {
  if (array.length < 2) {
    return array;
  }

  let unique = [...new Set(array)];

  if (unique.includes(0)) {
    const zeroes = array.filter(value => value === 0);

    if (zeroes.length > 1 && zeroes.some(value => 1 / value === Number.NEGATIVE_INFINITY)) {
      unique.push(-0);
    }
  }

  if (unique.filter(value => typeof value === "string").length) {
    const strings = array.filter(value => typeof value === "string");

    if (strings.length > 1) {
      const normalized = [...new Set(strings.map(value => value.normalize()))];
      normalized.forEach(value => {
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

  if (sort) {
    return unique.sort();
  }

  return unique;
}
/**
 * @name castToJson
 * @param {*} value
 * @param {boolean=} sort
 * @returns {*}
 */


function castToJson(value, sort = CONFIG_SORT) {
  if (sort) {
    return collectionSortKeys(jsonParse(jsonStringify(value)), true);
  } else {
    return jsonParse(jsonStringify(value));
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
 * @name isRegExp
 * @param {*} value
 * @returns {boolean}
 */


function isRegExp(value) {
  return value instanceof RegExp;
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
 * @name jsonParse
 * @param {string} text
 * @returns *
 */


function jsonParse(text) {
  return JSON.parse(text);
}
/**
 * @name jsonStringify
 * @param {*} value
 * @returns string
 */


function jsonStringify(value) {
  return JSON.stringify(value);
}
/**
 * @name objectDeserialize
 * @param {string} value
 * @returns {*}
 */


function objectDeserialize(value) {
  if (isString(value)) {
    return jsonParse(value);
  }

  return value;
}
/**
 * @name objectOrderKeys
 * @param {Object} object
 * @param {Array.<string>} keys
 * @param {boolean=} sortAlphabetically
 * @returns {{}|*}
 */


function objectOrderKeys(object, keys = [], sortAlphabetically = CONFIG_SORT) {
  if (!Array.isArray(keys) || keys.length === 0) {
    return object;
  }

  const orderKeys = keys.filter(key => typeof key === "string");
  let objectKeys = new Set(Object.keys(object));
  const newObject = {};
  orderKeys.forEach(key => {
    objectKeys.delete(key);

    if (key in object) {
      newObject[key] = object[key];
    }
  });
  objectKeys = [...objectKeys];

  if (sortAlphabetically) {
    objectKeys = objectKeys.sort((alpha, beta) => alpha.localeCompare(beta));
  }

  objectKeys.forEach(key => newObject[key] = object[key]);
  return newObject;
}
/**
 * @name objectSerialize
 * @param {object|string} value
 * @returns {string}
 */


function objectSerialize(value) {
  let data;
  const {
    toJSON,
    toObject
  } = value;

  if (isFunction(toObject)) {
    data = value.toObject();
  } else if (isFunction(toJSON)) {
    data = value.toJSON();
  } else {
    data = value;
  }

  if (isString(data)) {
    return data;
  }

  return jsonStringify(data);
}
/**
 * @name objectToPlain
 * @param {object|string} value
 * @returns {*}
 */


function objectToPlain(value) {
  return objectDeserialize(objectSerialize(value));
}
/**
 * @name toFlag
 * @description
 * Turns: undefined, null, 0, 0n, "", "false", "FALSE" to boolean false.
 * Turns: 1, 1n, "1", "true", "TRUE" to boolean true.
 * @param {*} value
 * @param {*=false} onEmpty
 * @param {*=false} onUnParsable
 * @returns {boolean}
 */


function toFlag(value, onEmpty = false, onUnParsable = false) {
  if (value === undefined || value === null) {
    return onEmpty;
  }

  if (typeof value === "boolean") {
    return value;
  }

  const affirmative = value.toString().toLocaleLowerCase().trim();

  if (affirmative.length === 0) {
    return onEmpty;
  }

  if (affirmative === "true" || affirmative === "1") {
    return true;
  }

  if (affirmative === "false" || affirmative === "0") {
    return false;
  }

  return onUnParsable;
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

  if (result === "0" && Object.is(value, -0)) {
    return "-0";
  }

  return result;
} //#endregion
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

  Object.keys(propertyToType).forEach(key => {
    if (!isString(propertyToType[key])) {
      throw new TypeError(`'Cast' expect object values to be strings. Not a string at key: '${jsonStringify(propertyToType[key])}'.`);
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

  Object.keys(propertyToType).forEach(key => {
    const castTo = propertyToType[key];

    if (!(key in dataToSerialize)) {
      throw new Error(`Field '${key}' suppose to be converted to ${castTo}.`);
    }

    switch (castTo) {
      case TYPES_ENUM.BOOLEAN:
        dataToSerialize[key] = Boolean(dataToSerialize[key]);
        break;

      case TYPES_ENUM.FLAG:
        dataToSerialize[key] = toFlag(dataToSerialize[key]);
        break;

      case TYPES_ENUM.NUMERIC:
        {
          const castedNumber = Number(dataToSerialize[key]);

          if (Number.isFinite(castedNumber)) {
            dataToSerialize[key] = castedNumber;
          } else {
            const parsed = Number.parseFloat(toString(dataToSerialize[key]).trim());

            if (Number.isFinite(parsed)) {
              dataToSerialize[key] = parsed;
            } else {
              dataToSerialize[key] = 0;
            }
          }

          break;
        }

      case TYPES_ENUM.INTEGER:
        {
          const castedInteger = Number(dataToSerialize[key]);

          if (Number.isFinite(castedInteger)) {
            dataToSerialize[key] = Math.trunc(castedInteger);
          } else {
            const parsed = Number.parseFloat(toString(dataToSerialize[key]).trim());

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
        dataToSerialize[key] = objectToPlain(dataToSerialize[key]);
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
} //#endregion
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

  Object.keys(propertyDefaultValues).forEach(key => {
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
} //#endregion
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

  return arrayUnique(propertiesMustBeDefined).map(value => {
    if (!isString(value)) {
      throw new TypeError(`'Defined' expect array of strings. Value: '${jsonStringify(value)}'.`);
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

  config.forEach(key => {
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
} //#endregion
//#region Exclude

/**
 * @name excludeConfig
 * @throws TypeError
 * @param {Array.<string|RegExp>} propertiesToExclude
 * @returns {Array.<string|RegExp>}
 */


function excludeConfig(propertiesToExclude) {
  if (!Array.isArray(propertiesToExclude)) {
    throw new TypeError("'Exclude' should be an array");
  }

  if (isArrayEmpty(propertiesToExclude)) {
    return [];
  }

  return arrayUnique(propertiesToExclude).map(value => {
    if (!isString(value) && !isRegExp(value)) {
      throw new TypeError(`'Exclude' expect array of strings or regular expressions. Value: '${jsonStringify(value)}'.`);
    }

    return value;
  });
}
/**
 * @name excludeData
 * @param {Array.<string|RegExp>} propertiesToExclude
 * @param {Object} data
 * @returns {Object}
 */


function excludeData(propertiesToExclude, data) {
  if (isArrayEmpty(propertiesToExclude)) {
    return data;
  }

  const excludeString = propertiesToExclude.filter(isString);

  if (excludeString.length) {
    Object.keys(data).forEach(key => {
      if (excludeString.includes(key)) {
        delete data[key];
      }
    });
  }

  const keys = objectKeys(data);

  if (keys.length === 0) {
    return data;
  }

  const excludeRegExp = propertiesToExclude.filter(isRegExp);

  if (excludeRegExp.length) {
    excludeRegExp.forEach(reg => {
      Object.keys(data).forEach(key => {
        if (reg.test(key)) {
          delete data[key];
        }
      });
    });
  }

  return data;
}
/**
 * @name exclude
 * @throws TypeError
 * @param {Object} data
 * @param {Array.<string|RegExp>=} propertiesToExclude
 * @returns {Object}
 */


function exclude(data, propertiesToExclude = []) {
  const config = excludeConfig(propertiesToExclude);

  if (isArrayEmpty(config)) {
    return data;
  }

  const excludeString = config.filter(isString);

  if (excludeString.length) {
    Object.keys(data).forEach(key => {
      if (excludeString.includes(key)) {
        delete data[key];
      }
    });
  }

  const keys = objectKeys(data);

  if (keys.length === 0) {
    return data;
  }

  const excludeRegExp = config.filter(isRegExp);

  if (excludeRegExp.length) {
    excludeRegExp.forEach(reg => {
      Object.keys(data).forEach(key => {
        if (reg.test(key)) {
          delete data[key];
        }
      });
    });
  }

  return data;
} //#endregion
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

  return arrayUnique(propertiesToOmit).map(value => {
    if (!isString(value)) {
      throw new TypeError(`'Omit' expect array of strings. Value: '${jsonStringify(value)}'.`);
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
  Object.keys(data).forEach(key => {
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
  Object.keys(data).forEach(key => {
    if (config.includes(key)) {
      return;
    }

    dataToSerialize[key] = data[key];
  });
  return dataToSerialize;
} //#endregion
//#region Order

/**
 * @name orderConfig
 * @throws TypeError
 * @param {Array.<string>} propertiesToStreamline
 * @returns {Array.<string>}
 */


function orderConfig(propertiesToStreamline) {
  if (!Array.isArray(propertiesToStreamline)) {
    throw new TypeError("'Order' should be an array");
  }

  if (isArrayEmpty(propertiesToStreamline)) {
    return [];
  }

  return arrayUnique(propertiesToStreamline, false).map(value => {
    if (!isString(value)) {
      throw new TypeError(`'Order' expect array of strings. Value: '${jsonStringify(value)}'.`);
    }

    return value;
  });
}
/**
 * @name orderData
 * @param {Array.<string>} propertiesToStreamline
 * @param {Object} data
 * @param {boolean=} sort
 * @returns {Object}
 */


function orderData(propertiesToStreamline, data, sort = CONFIG_SORT) {
  if (isArrayEmpty(propertiesToStreamline)) {
    return data;
  }

  return objectOrderKeys(data, propertiesToStreamline, sort);
}
/**
 * @name order
 * @throws TypeError
 * @param {Object} data
 * @param {Array.<string>=} propertiesToStreamline
 * @param {boolean=} sort
 * @returns {Object}
 */


function order(data, propertiesToStreamline = [], sort = CONFIG_SORT) {
  const config = orderConfig(propertiesToStreamline);

  if (isArrayEmpty(config)) {
    return data;
  }

  return objectOrderKeys(data, propertiesToStreamline, sort);
} //#endregion
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

  return arrayUnique(propertiesToPick).map(value => {
    if (!isString(value)) {
      throw new TypeError(`'Pick' expect array of strings. Value: '${jsonStringify(value)}'.`);
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
  Object.keys(dataToSerialize).forEach(key => {
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
} //#endregion
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

  Object.keys(renamePropertyFromTo).forEach(key => {
    if (!isString(key)) {
      throw new TypeError(`'Rename' expect object values to be strings. Not a string at key: '${key}'.`);
    }
  });
  const to = Object.values(renamePropertyFromTo);
  const toUnique = arrayUnique(to);

  if (to.length !== toUnique.length) {
    throw new TypeError(`'Rename' has similar values: '${jsonStringify(toUnique)}'.`);
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
  renameFrom.forEach(key => {
    if (!(key in dataToSerialize)) {
      throw new Error(`Field '${key}' suppose to be renamed.`);
    }

    renamedData[renamePropertyFromTo[key]] = dataToSerialize[key];
  });
  renameFrom.forEach(key => {
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
} //#endregion
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

  Object.keys(replacePropertyValues).forEach(key => {
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
} //#endregion
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

  return arrayUnique(propertiesRequired).map(value => {
    if (!isString(value)) {
      throw new TypeError(`'Required' expect array of strings. Value: '${jsonStringify(value)}'.`);
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

  propertiesRequired.forEach(key => {
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
} //#endregion
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

  Object.keys(propertyValueTransformWith).forEach(key => {
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

  Object.keys(propertyValueTransformWith).forEach(key => {
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
} //#endregion
//#endregion
//#region Class


class Vicis {
  //#region Config Fields

  /**
   * @name cast
   * @private
   * @type {Object}
   */

  /**
   * @name defaults
   * @private
   * @type {Object}
   */

  /**
   * @name defined
   * @private
   * @type {Array.<string>}
   */

  /**
   * @name exclude
   * @private
   * @type {Array.<string|RegExp>}
   */

  /**
   * @name omit
   * @private
   * @type {Array.<string>}
   */

  /**
   * @name order
   * @private
   * @type {Array.<string>}
   */

  /**
   * @name pick
   * @private
   * @type {Array.<string>}
   */

  /**
   * @name sort
   * @private
   * @type {boolean}
   */

  /**
   * @name rename
   * @private
   * @type {Object}
   */

  /**
   * @name replace
   * @private
   * @type {Object}
   */

  /**
   * @name required
   * @private
   * @type {Array.<string>}
   */

  /**
   * @name transform
   * @private
   * @type {Object}
   */
  //#endregion
  //#region Data Fields

  /**
   * @name dataCache
   * @private
   * @type {Object}
   */

  /**
   * @name dataOriginal
   * @private
   * @type {Object}
   */
  //#endregion
  //#region Private Methods

  /**
   * @name validateConfig
   * @private
   * @method
   * @throws Error
   * @returns {Vicis}
   */

  /**
   * @name validateData
   * @private
   * @method
   * @throws Error
   * @returns {Vicis}
   */
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
    _cast.set(this, {
      writable: true,
      value: {}
    });

    _defaults.set(this, {
      writable: true,
      value: []
    });

    _defined.set(this, {
      writable: true,
      value: []
    });

    _exclude.set(this, {
      writable: true,
      value: []
    });

    _omit.set(this, {
      writable: true,
      value: []
    });

    _order.set(this, {
      writable: true,
      value: []
    });

    _pick.set(this, {
      writable: true,
      value: []
    });

    _sort.set(this, {
      writable: true,
      value: CONFIG_SORT
    });

    _rename.set(this, {
      writable: true,
      value: {}
    });

    _replace.set(this, {
      writable: true,
      value: {}
    });

    _required.set(this, {
      writable: true,
      value: []
    });

    _transform.set(this, {
      writable: true,
      value: {}
    });

    _dataCache.set(this, {
      writable: true,
      value: {}
    });

    _dataOriginal.set(this, {
      writable: true,
      value: {}
    });

    _validateConfig.set(this, {
      writable: true,
      value: void 0
    });

    _validateData.set(this, {
      writable: true,
      value: void 0
    });

    /**
     * @name validateConfig
     * @private
     * @method
     * @throws Error
     * @returns {Vicis}
     */
    _classPrivateFieldSet(this, _validateConfig, function validateConfig() {
      const cast = objectKeys(_classPrivateFieldGet(this, _cast));
      const rename = objectKeys(_classPrivateFieldGet(this, _rename));
      const replace = objectKeys(_classPrivateFieldGet(this, _replace));
      const transform = objectKeys(_classPrivateFieldGet(this, _transform));

      if (arrayHasSame(_classPrivateFieldGet(this, _omit), cast)) {
        throw new Error(`'omit' has same keys as 'cast': ${arrayIntersect(_classPrivateFieldGet(this, _omit), cast)}.`);
      }

      if (arrayHasSame(_classPrivateFieldGet(this, _omit), _classPrivateFieldGet(this, _defined))) {
        throw new Error(`'omit' has same keys as 'defined': ${arrayIntersect(_classPrivateFieldGet(this, _omit), _classPrivateFieldGet(this, _defined))}.`);
      }

      if (arrayHasSame(_classPrivateFieldGet(this, _omit), _classPrivateFieldGet(this, _pick))) {
        throw new Error(`'omit' has same keys as 'pick': ${arrayIntersect(_classPrivateFieldGet(this, _omit), _classPrivateFieldGet(this, _pick))}.`);
      }

      if (arrayHasSame(_classPrivateFieldGet(this, _omit), rename)) {
        throw new Error(`'omit' has same keys as 'rename': ${arrayIntersect(_classPrivateFieldGet(this, _omit), rename)}.`);
      }

      if (arrayHasSame(_classPrivateFieldGet(this, _omit), replace)) {
        throw new Error(`'omit' has same keys as 'replace': ${arrayIntersect(_classPrivateFieldGet(this, _omit), replace)}.`);
      }

      if (arrayHasSame(_classPrivateFieldGet(this, _omit), _classPrivateFieldGet(this, _required))) {
        throw new Error(`'omit' has same keys as 'required': ${arrayIntersect(_classPrivateFieldGet(this, _omit), _classPrivateFieldGet(this, _required))}.`);
      }

      if (arrayHasSame(_classPrivateFieldGet(this, _omit), transform)) {
        throw new Error(`'omit' has same keys as 'transform': ${arrayIntersect(_classPrivateFieldGet(this, _omit), transform)}.`);
      }

      if (arrayHasSame(_classPrivateFieldGet(this, _omit), transform)) {
        throw new Error(`'omit' has same keys as 'transform': ${arrayIntersect(_classPrivateFieldGet(this, _omit), transform)}.`);
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
    }.bind(this));
    /**
     * @name validateData
     * @private
     * @method
     * @throws Error
     * @returns {Vicis}
     */


    _classPrivateFieldSet(this, _validateData, function validateData() {
      if ("toObject" in _classPrivateFieldGet(this, _dataOriginal) && isFunction(_classPrivateFieldGet(this, _dataOriginal).toObject)) {
        _classPrivateFieldSet(this, _dataCache, _classPrivateFieldGet(this, _dataOriginal).toObject());
      } else if ("toJSON" in _classPrivateFieldGet(this, _dataOriginal) && isFunction(_classPrivateFieldGet(this, _dataOriginal).toJSON)) {
        _classPrivateFieldSet(this, _dataCache, _classPrivateFieldGet(this, _dataOriginal).toJSON());
      } else {
        _classPrivateFieldSet(this, _dataCache, _classPrivateFieldGet(this, _dataOriginal));
      }

      _classPrivateFieldSet(this, _dataCache, omitData(_classPrivateFieldGet(this, _omit), _classPrivateFieldGet(this, _dataCache)));

      _classPrivateFieldSet(this, _dataCache, requiredData(_classPrivateFieldGet(this, _required), _classPrivateFieldGet(this, _dataCache)));

      _classPrivateFieldSet(this, _dataCache, definedData(_classPrivateFieldGet(this, _defined), _classPrivateFieldGet(this, _dataCache)));

      _classPrivateFieldSet(this, _dataCache, castData(_classPrivateFieldGet(this, _cast), _classPrivateFieldGet(this, _dataCache)));

      _classPrivateFieldSet(this, _dataCache, transformData(_classPrivateFieldGet(this, _transform), _classPrivateFieldGet(this, _dataCache)));

      _classPrivateFieldSet(this, _dataCache, replaceData(_classPrivateFieldGet(this, _replace), _classPrivateFieldGet(this, _dataCache)));

      _classPrivateFieldSet(this, _dataCache, renameData(_classPrivateFieldGet(this, _rename), _classPrivateFieldGet(this, _dataCache)));

      _classPrivateFieldSet(this, _dataCache, defaultsData(_classPrivateFieldGet(this, _defaults), _classPrivateFieldGet(this, _dataCache)));

      _classPrivateFieldSet(this, _dataCache, pickData(_classPrivateFieldGet(this, _pick), _classPrivateFieldGet(this, _dataCache)));

      _classPrivateFieldSet(this, _dataCache, excludeData(_classPrivateFieldGet(this, _exclude), _classPrivateFieldGet(this, _dataCache)));

      _classPrivateFieldSet(this, _dataCache, castToJson(_classPrivateFieldGet(this, _dataCache), _classPrivateFieldGet(this, _sort)));

      _classPrivateFieldSet(this, _dataCache, orderData(_classPrivateFieldGet(this, _order), _classPrivateFieldGet(this, _dataCache), _classPrivateFieldGet(this, _sort)));

      return this;
    }.bind(this));

    this.config(config);

    if (data !== undefined) {
      this.data(data);
    }
  } //#endregion
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
  } //#endregion
  //#region Public Config Methods

  /**
   * @name getConfig
   * @public
   * @returns {Object}
   */


  getConfig() {
    return clone({
      cast: _classPrivateFieldGet(this, _cast),
      defaults: _classPrivateFieldGet(this, _defaults),
      defined: _classPrivateFieldGet(this, _defined),
      exclude: _classPrivateFieldGet(this, _exclude),
      omit: _classPrivateFieldGet(this, _omit),
      order: _classPrivateFieldGet(this, _order),
      pick: _classPrivateFieldGet(this, _pick),
      sort: _classPrivateFieldGet(this, _sort),
      rename: _classPrivateFieldGet(this, _rename),
      replace: _classPrivateFieldGet(this, _replace),
      required: _classPrivateFieldGet(this, _required),
      transform: _classPrivateFieldGet(this, _transform)
    });
  }
  /**
   * @name resetConfig
   * @public
   * @returns {Vicis}
   */


  resetConfig() {
    _classPrivateFieldSet(this, _cast, {});

    _classPrivateFieldSet(this, _defaults, {});

    _classPrivateFieldSet(this, _defined, []);

    _classPrivateFieldSet(this, _exclude, []);

    _classPrivateFieldSet(this, _omit, []);

    _classPrivateFieldSet(this, _order, []);

    _classPrivateFieldSet(this, _pick, []);

    _classPrivateFieldSet(this, _sort, CONFIG_SORT);

    _classPrivateFieldSet(this, _rename, {});

    _classPrivateFieldSet(this, _replace, {});

    _classPrivateFieldSet(this, _required, []);

    _classPrivateFieldSet(this, _transform, {});

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
    this.exclude(config.exclude);
    this.order(config.order);

    _classPrivateFieldGet(this, _validateConfig).call(this);

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
    _classPrivateFieldSet(this, _cast, castConfig(propertyToType));

    _classPrivateFieldGet(this, _validateConfig).call(this);

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
    _classPrivateFieldSet(this, _defaults, defaultsConfig(propertyDefaultValues)); // do not deep clone!


    _classPrivateFieldGet(this, _validateConfig).call(this);

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
    _classPrivateFieldSet(this, _defined, definedConfig(propertiesMustBeDefined));

    _classPrivateFieldGet(this, _validateConfig).call(this);

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
    _classPrivateFieldSet(this, _exclude, excludeConfig(propertiesToExclude));

    _classPrivateFieldGet(this, _validateConfig).call(this);

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
    _classPrivateFieldSet(this, _omit, omitConfig(propertiesToOmit));

    _classPrivateFieldGet(this, _validateConfig).call(this);

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
    _classPrivateFieldSet(this, _order, orderConfig(propertiesToStreamline));

    _classPrivateFieldGet(this, _validateConfig).call(this);

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
    _classPrivateFieldSet(this, _pick, pickConfig(propertiesToPick));

    _classPrivateFieldGet(this, _validateConfig).call(this);

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
    _classPrivateFieldSet(this, _rename, renameConfig(renamePropertyFromTo));

    _classPrivateFieldGet(this, _validateConfig).call(this);

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
    _classPrivateFieldSet(this, _replace, replaceConfig(replacePropertyValues)); // do not deep clone!


    _classPrivateFieldGet(this, _validateConfig).call(this);

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
    _classPrivateFieldSet(this, _required, requiredConfig(propertiesRequired));

    _classPrivateFieldGet(this, _validateConfig).call(this);

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

    _classPrivateFieldSet(this, _sort, sortProperties);

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
    _classPrivateFieldSet(this, _transform, transformConfig(propertyValueTransformWith)); // do not deep clone!


    _classPrivateFieldGet(this, _validateConfig).call(this);

    return this;
  } //#endregion
  //#region Public Data Methods

  /**
   * @name getData
   * @public
   * @returns {Object}
   */


  getData() {
    return clone(_classPrivateFieldGet(this, _dataCache));
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

    _classPrivateFieldSet(this, _dataOriginal, dataToSerialize); // keep reference


    _classPrivateFieldGet(this, _validateData).call(this);

    return this;
  }
  /**
   * @name clear
   * @description Clear any data references and cached values
   * @public
   * @returns {Vicis}
   */


  clear() {
    _classPrivateFieldSet(this, _dataCache, {});

    _classPrivateFieldSet(this, _dataOriginal, {});

    return this;
  } //#endregion
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
    return Array.from(collection).map(data => this.data(data).toJSON());
  } //#endregion


} //#endregion


var _cast = new WeakMap();

var _defaults = new WeakMap();

var _defined = new WeakMap();

var _exclude = new WeakMap();

var _omit = new WeakMap();

var _order = new WeakMap();

var _pick = new WeakMap();

var _sort = new WeakMap();

var _rename = new WeakMap();

var _replace = new WeakMap();

var _required = new WeakMap();

var _transform = new WeakMap();

var _dataCache = new WeakMap();

var _dataOriginal = new WeakMap();

var _validateConfig = new WeakMap();

var _validateData = new WeakMap();

export { TYPES_ENUM, Vicis, cast, defaults, defined, exclude, omit, order, pick, rename, replace, required, transform };
