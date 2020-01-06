// import { arrayDiff } from "../helper/arrayDiff.mjs";
// import { arrayHasSame } from "../helper/arrayHasSame.mjs";
// import { arrayIntersect } from "../helper/arrayIntersect.mjs";
// import { arrayUnique } from "../helper/arrayUnique.mjs";
// import { castToJson } from "../helper/castToJson.mjs";
// import { isFunction } from "../helper/isFunction.mjs";
// import { isObjectLike } from "../helper/isObjectLike.mjs";
// import { isString } from "../helper/isString.mjs";
// import { objectKeys } from "../helper/objectKeys.mjs";
// import { toString } from "../helper/toString.mjs";
//
// const TYPES_ENUM = {
//   BOOLEAN: "boolean",
//   NUMERIC: "numeric",
//   INTEGER: "integer",
//   STRING: "string",
//   JSON: "json",
// };
//
// const TYPES_LIST = ["boolean", "numeric", "integer", "string", "json"];
//
// const CONFIG_DEFAULT = {
//   cast: {},
//   default: {},
//   defined: [],
//   omit: [],
//   pick: [],
//   sort: true,
//   rename: {},
//   replace: {},
//   required: [],
//   transform: {},
// };
//
// const CONFIG_FIELDS = [
//   "cast",
//   "default",
//   "defined",
//   "omit",
//   "pick",
//   "sort",
//   "rename",
//   "replace",
//   "required",
//   "transform",
// ];
//
// class Vicis {
//   /**
//    * @name cache
//    * @private
//    * @type Object
//    */
//   #cache = {};
//   /**
//    * @name config
//    * @private
//    * @type Object
//    */
//   #config = {};
//   /**
//    * @name config
//    * @private
//    * @type Object
//    */
//   #skipValidation = true;
//   /**
//    * @name original
//    * @private
//    * @type Object
//    */
//   #original = {};
//   /**
//    * @name factory
//    * @public
//    * @static
//    * @factory
//    * @param {object=} config
//    * @param {object=} data
//    * @returns {Vicis}
//    */
//   static factory(config = {}, data) {
//     return new Vicis(config, data);
//   }
//   /**
//    * @name constructor
//    * @public
//    * @constructor
//    * @param {object=} config
//    * @param {object=} data
//    */
//   constructor(config = {}, data) {
//     this.config(config);
//     if (data !== undefined) {
//       this.data(data);
//     }
//   }
//   /**
//    * @name config
//    * @public
//    * @throws TypeError
//    * @param {Object<string, object>} config
//    * @return {Vicis}
//    */
//   config(config = {}) {
//     if (!isObjectLike(config)) {
//       throw new TypeError("'config' should be an object");
//     }
//     const diff = arrayDiff(objectKeys(config), CONFIG_FIELDS);
//     if (diff.length) {
//       throw new TypeError(`'config' has unknown fields: '${diff.join("', '")}'.`);
//     }
//     this.#config = JSON.parse(JSON.stringify(CONFIG_DEFAULT));
//     this.#skipValidation = false;
//     this.omit(config.omit);
//     this.#skipValidation = false;
//     this.cast(config.cast);
//     this.#skipValidation = false;
//     this.defined(config.defined);
//     this.#skipValidation = false;
//     this.pick(config.pick);
//     this.#skipValidation = false;
//     this.rename(config.rename);
//     this.#skipValidation = false;
//     this.replace(config.replace);
//     this.#skipValidation = false;
//     this.required(config.required);
//     this.#skipValidation = false;
//     this.transform(config.transform);
//     this.#skipValidation = false;
//     this.default(config.default);
//     this.validateConfig();
//     return this;
//   }
//   /**
//    * @name cast
//    * @public
//    * @throws TypeError
//    * @param {Object<string, string>} config
//    * @return {Vicis}
//    */
//   cast(config = {}) {
//     if (!isObjectLike(config)) {
//       throw new TypeError("'cast' should be an object");
//     }
//     const newConfig = {};
//     Object.keys(config).forEach((key) => {
//       if (!isString(config[key])) {
//         throw new TypeError(`'cast' expect object values to be strings. Not a string at key: '${config[key]}'.`);
//       }
//       if (!TYPES_LIST.includes(config[key])) {
//         throw new TypeError(`'cast' has unknown type in {${key}: "${config[key]}"}.`);
//       }
//       newConfig[key] = config[key];
//     });
//     this.#config.cast = newConfig;
//     return this;
//   }
//   /**
//    * @name setConfigDefault
//    * @protected
//    * @throws TypeError
//    * @param {Object<string, *>} config
//    * @return {Vicis}
//    */
//   default(config = {}) {
//     if (!isObjectLike(config)) {
//       throw new TypeError("'default' should be an object");
//     }
//     this.#config.default = { ...config };
//     return this;
//   }
//   /**
//    * @name defined
//    * @public
//    * @throws TypeError
//    * @param {string[]} config
//    * @return {Vicis}
//    */
//   defined(config = []) {
//     if (!Array.isArray(config)) {
//       throw new TypeError("'defined' should be an array");
//     }
//     this.#config.defined = arrayUnique(config).map((value) => {
//       if (!isString(value)) {
//         throw new TypeError(`'defined' expect array of strings. Value: '${value.toString()}'.`);
//       }
//       return value;
//     });
//     return this;
//   }
//   /**
//    * @name omit
//    * @public
//    * @throws TypeError
//    * @param {string[]} config
//    * @return {Vicis}
//    */
//   omit(config = []) {
//     if (!Array.isArray(config)) {
//       throw new TypeError("'omit' should be an array");
//     }
//     this.#config.omit = arrayUnique(config).map((value) => {
//       if (!isString(value)) {
//         throw new TypeError(`'omit' expect array of strings. Value: '${value.toString()}'.`);
//       }
//       return value;
//     });
//     return this;
//   }
//   /**
//    * @name pick
//    * @public
//    * @throws TypeError
//    * @param {string[]} config
//    * @return {Vicis}
//    */
//   pick(config = []) {
//     if (!Array.isArray(config)) {
//       throw new TypeError("'pick' should be an array");
//     }
//     this.#config.pick = arrayUnique(config).map((value) => {
//       if (!isString(value)) {
//         throw new TypeError(`'pick' expect array of strings. Value: '${value.toString()}'.`);
//       }
//       return value;
//     });
//     return this;
//   }
//   /**
//    * @name rename
//    * @public
//    * @throws TypeError
//    * @param {Object<string, function>} config
//    * @return {Vicis}
//    */
//   rename(config = {}) {
//     if (!isObjectLike(config)) {
//       throw new TypeError("'rename' should be an object");
//     }
//     const newConfig = {};
//     Object.keys(config).forEach((key) => {
//       if (!isString(key)) {
//         throw new TypeError(`'rename' expect object values to be strings. Not a string at key: '${key}'.`);
//       }
//       newConfig[key] = config[key];
//     });
//     const rename = Object.values(this.#config.rename);
//     const renameTo = arrayIntersect(rename, arrayUnique(rename));
//     if (rename.length !== renameTo.length) {
//       throw new Error(`'rename' has similar values: ${renameTo.join(",")}.`);
//     }
//     this.#config.rename = newConfig;
//     return this;
//   }
//   /**
//    * @name replace
//    * @public
//    * @throws TypeError
//    * @param {Object<string, *>} config
//    * @return {Vicis}
//    */
//   replace(config = {}) {
//     if (!isObjectLike(config)) {
//       throw new TypeError("'replace' should be an object");
//     }
//     this.#config.replace = { ...config };
//     return this;
//   }
//   /**
//    * @name required
//    * @public
//    * @throws TypeError
//    * @param {string[]} config
//    * @return {Vicis}
//    */
//   required(config = []) {
//     if (!Array.isArray(config)) {
//       throw new TypeError("'required' should be an array");
//     }
//     this.#config.required = arrayUnique(config).map((value) => {
//       if (!isString(value)) {
//         throw new TypeError(`'required' expect array of strings. Value: '${value.toString()}'.`);
//       }
//       return value;
//     });
//     return this;
//   }
//   /**
//    * @name transform
//    * @public
//    * @throws TypeError
//    * @param {Object<string, function>} config
//    * @return {Vicis}
//    */
//   transform(config = {}) {
//     if (!isObjectLike(config)) {
//       throw new TypeError("'transform' should be an object");
//     }
//     const newConfig = {};
//     Object.keys(config).forEach((key) => {
//       if (!isFunction(config[key])) {
//         throw new TypeError(`'transform' expect object values to be functions. Not a function at key: '${key}'.`);
//       }
//       newConfig[key] = config[key];
//     });
//     this.#config.transform = newConfig;
//     return this;
//   }
//   /**
//    * @name validateConfig
//    * @protected
//    * @throws Error
//    * @return {Vicis}
//    */
//   validateConfig() {
//     console.log("Validate Config");
//     if (arrayHasSame(this.#config.omit, this.#config.cast)) {
//       throw new Error(`'omit' has same keys as 'cast': ${arrayIntersect(this.#config.omit, this.#config.cast)}.`);
//     }
//     if (arrayHasSame(this.#config.omit, this.#config.defined)) {
//       throw new Error(`'omit' has same keys as 'defined': ${arrayIntersect(this.#config.omit, this.#config.defined)}.`);
//     }
//     if (arrayHasSame(this.#config.omit, this.#config.pick)) {
//       throw new Error(`'omit' has same keys as 'pick': ${arrayIntersect(this.#config.omit, this.#config.pick)}.`);
//     }
//     if (arrayHasSame(this.#config.omit, this.#config.rename)) {
//       throw new Error(`'omit' has same keys as 'rename': ${arrayIntersect(this.#config.omit, this.#config.rename)}.`);
//     }
//     if (arrayHasSame(this.#config.omit, this.#config.replace)) {
//       throw new Error(`'omit' has same keys as 'replace': ${arrayIntersect(this.#config.omit, this.#config.replace)}.`);
//     }
//     if (arrayHasSame(this.#config.omit, this.#config.required)) {
//       throw new Error(
//         `'omit' has same keys as 'required': ${arrayIntersect(this.#config.omit, this.#config.required)}.`,
//       );
//     }
//     if (arrayHasSame(this.#config.omit, this.#config.transform)) {
//       throw new Error(
//         `'omit' has same keys as 'transform': ${arrayIntersect(this.#config.omit, this.#config.transform)}.`,
//       );
//     }
//     if (arrayHasSame(this.#config.omit, this.#config.transform)) {
//       throw new Error(
//         `'omit' has same keys as 'transform': ${arrayIntersect(this.#config.omit, this.#config.transform)}.`,
//       );
//     }
//     if (arrayHasSame(this.#config.cast, this.#config.replace)) {
//       throw new Error(`'cast' has same keys as 'replace': ${arrayIntersect(this.#config.cast, this.#config.replace)}.`);
//     }
//     if (arrayHasSame(this.#config.cast, this.#config.transform)) {
//       throw new Error(
//         `'cast' has same keys as 'transform': ${arrayIntersect(this.#config.cast, this.#config.transform)}.`,
//       );
//     }
//     if (arrayHasSame(this.#config.replace, this.#config.transform)) {
//       throw new Error(
//         `'replace' has same keys as 'transform': ${arrayIntersect(this.#config.replace, this.#config.transform)}.`,
//       );
//     }
//     return this;
//   }
//   /**
//    * @name data
//    * @public
//    * @throws TypeError
//    * @param {Object} data
//    * @return {Vicis}
//    */
//   data(data) {
//     if (!isObjectLike(data)) {
//       throw new TypeError("'data' should be an object");
//     }
//     this.#original = data; // keep reference
//     this.#skipValidation = false;
//     this.validateData();
//     return this;
//   }
//   /**
//    * @name validateData
//    * @protected
//    * @throws Error
//    * @return {Vicis}
//    */
//   validateData() {
//     console.log("Validate Data");
//     if (this.#skipValidation) {
//       this.#skipValidation = false;
//       return this;
//     }
//     this.#cache = {};
//     Object.keys(this.#original).forEach((key) => {
//       if (this.#config.omit.includes(key)) {
//         return;
//       }
//       this.#cache[key] = this.#original[key];
//     });
//     this.#config.required.forEach((key) => {
//       if (!(key in this.#cache)) {
//         throw new Error(`Field '${key}' is required.`);
//       }
//     });
//     this.#config.defined.forEach((key) => {
//       if (!(key in this.#cache)) {
//         throw new Error(`Field '${key}' must be defined.`);
//       }
//       if (this.#cache[key] === undefined) {
//         throw new Error(`Field '${key}' should have value.`);
//       }
//     });
//     Object.keys(this.#config.cast).forEach((key) => {
//       const castTo = this.#config.cast[key];
//       if (!(key in this.#cache)) {
//         throw new Error(`Field '${key}' suppose to be converted to ${castTo}.`);
//       }
//       switch (castTo) {
//         case TYPES_ENUM.BOOLEAN:
//           this.#cache[key] = Boolean(this.#cache[key]);
//           break;
//         case TYPES_ENUM.NUMERIC: {
//           const castedNumber = Number(this.#cache[key]);
//           if (Number.isFinite(castedNumber)) {
//             this.#cache[key] = castedNumber;
//           } else {
//             const parsed = Number.parseFloat(this.#cache[key]);
//             if (Number.isFinite(parsed)) {
//               this.#cache[key] = parsed;
//             } else {
//               this.#cache[key] = 0;
//             }
//           }
//           break;
//         }
//         case TYPES_ENUM.INTEGER: {
//           const castedInteger = Number(this.#cache[key]);
//           if (Number.isFinite(castedInteger)) {
//             this.#cache[key] = Math.trunc(castedInteger);
//           } else {
//             const parsed = Number.parseFloat(this.#cache[key]);
//             if (Number.isFinite(parsed)) {
//               this.#cache[key] = Math.trunc(castedInteger);
//             } else {
//               this.#cache[key] = 0;
//             }
//           }
//           break;
//         }
//         case TYPES_ENUM.STRING:
//           this.#cache[key] = toString(this.#cache[key]);
//           break;
//         case TYPES_ENUM.JSON:
//           this.#cache[key] = JSON.parse(JSON.stringify(this.#cache[key]));
//           break;
//         default:
//           throw new Error("Unknown value convert error");
//       }
//     });
//     Object.keys(this.#config.transform).forEach((key) => {
//       if (!(key in this.#cache)) {
//         throw new Error(`Field '${key}' suppose to be transformed.`);
//       }
//       this.#cache[key] = this.#config.transform[key](this.#cache[key], key);
//     });
//     Object.keys(this.#config.replace).forEach((key) => {
//       this.#cache[key] = this.#config.replace[key];
//     });
//     const renameFrom = Object.keys(this.#config.rename).sort((alpha, beta) => alpha.localeCompare(beta));
//     const renamedData = {};
//     renameFrom.forEach((key) => {
//       if (!(key in this.#cache)) {
//         throw new Error(`Field '${key}' suppose to be renamed.`);
//       }
//       renamedData[this.#config.rename[key]] = this.#cache[key];
//     });
//     renameFrom.forEach((key) => {
//       delete this.#cache[key];
//     });
//     Object.assign(this.#cache, renamedData);
//     if (Object.keys(this.#config.pick).length > 0) {
//       let newCache = {};
//       Object.keys(this.#cache).forEach((key) => {
//         if (this.#config.pick.includes(key)) {
//           newCache[key] = this.#cache[key];
//         }
//       });
//       this.#cache = newCache;
//     }
//     if (Object.keys(this.#config.default).length > 0) {
//       Object.keys(this.#config.default).forEach((key) => {
//         if (!(key in this.#cache) || this.#cache[key] === undefined) {
//           this.#cache[key] = this.#config.default[key];
//         }
//       });
//     }
//     this.#cache = castToJson(this.#cache, this.#config.sort);
//     return this;
//   }
//   /**
//    * @name valueOf
//    * @public
//    * @returns {{}}
//    */
//   valueOf() {
//     return { ...this.#cache };
//   }
//   /**
//    * @name toJSON
//    * @public
//    * @returns {{}}
//    */
//   toJSON() {
//     return { ...this.#cache };
//   }
//   /**
//    * @name toString
//    * @public
//    * @returns {string}
//    */
//   toString() {
//     return JSON.stringify(this.#cache);
//   }
// }
//
// export default Vicis;
// export { TYPES_ENUM, TYPES_LIST, Vicis };
