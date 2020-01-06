// import { isObjectLike } from "../helper/isObjectLike";
// import { isString } from "../helper/isString";
// import { arrayUnique } from "../helper/arrayUnique";
// import { arrayIntersect } from "../helper/arrayIntersect";
// import { isFunction } from "../helper/isFunction";
// import { arrayHasSame } from "../helper/arrayHasSame";
// import { castToJson } from "../helper/castToJson";
//
// const TYPES_LIST = ["boolean", "numeric", "integer", "string", "json"];
//
// /**
//  * @deprecated Use {@link}
//  */
// class VicisConfig {
//   #cast = {};
//   #default = [];
//   #defined = [];
//   #omit = [];
//   #pick = [];
//   #sort = true;
//   #rename = {};
//   #replace = {};
//   #required = [];
//   #transform = {};
//   /**
//    * @name constructor
//    * @public
//    * @constructor
//    * @param {object} config
//    */
//   constructor(config = {}) {
//     this.setConfig(config);
//   }
//   /**
//    * @name setConfig
//    * @protected
//    * @throws TypeError
//    * @param {Object<string, object>} config
//    * @return {VicisConfig}
//    */
//   setConfig(config = {}) {
//     if (!isObjectLike(config)) {
//       throw new TypeError("'Config' should be an object");
//     }
//     this.setConfigOmit(config.omit);
//     this.setConfigCast(config.cast);
//     this.setConfigDefined(config.defined);
//     this.setConfigPick(config.pick);
//     this.setConfigRename(config.rename);
//     this.setConfigReplace(config.replace);
//     this.setConfigRequired(config.required);
//     this.setConfigTransform(config.transform);
//     this.checkConfig();
//     return this;
//   }
//   /**
//    * @name setConfigCast
//    * @protected
//    * @throws TypeError
//    * @param {Object<string, string>} config
//    * @return {VicisConfig}
//    */
//   setConfigCast(config = {}) {
//     if (!isObjectLike(config)) {
//       throw new TypeError("'cast' should be an object");
//     }
//     const newConfig = {};
//     Object.keys(config).forEach((key) => {
//       if (!isString(config[key])) {
//         throw new TypeError(`'cast' expect object values to be strings. Not a string at key: <${config[key]}>.`);
//       }
//       if (!TYPES_LIST.includes(config[key])) {
//         throw new TypeError(`'cast' has unknown type in {${key}: "${config[key]}"}.`);
//       }
//       newConfig[key] = config[key];
//     });
//     this.#cast = newConfig;
//     return this;
//   }
//   /**
//    * @name setConfigDefined
//    * @protected
//    * @throws TypeError
//    * @param {string[]} config
//    * @return {VicisConfig}
//    */
//   setConfigDefined(config = []) {
//     if (!Array.isArray(config)) {
//       throw new TypeError("'defined' should be an array");
//     }
//     this.#defined = arrayUnique(config).map((value) => {
//       if (!isString(value)) {
//         throw new TypeError(`'defined' expect array of strings. Value: <${value.toString()}>.`);
//       }
//       return value;
//     });
//     return this;
//   }
//   /**
//    * @name setConfigOmit
//    * @protected
//    * @throws TypeError
//    * @param {string[]} config
//    * @return {VicisConfig}
//    */
//   setConfigOmit(config = []) {
//     if (!Array.isArray(config)) {
//       throw new TypeError("'omit' should be an array");
//     }
//     this.#omit = arrayUnique(config).map((value) => {
//       if (!isString(value)) {
//         throw new TypeError(`'omit' expect array of strings. Value: <${value.toString()}>.`);
//       }
//       return value;
//     });
//     return this;
//   }
//   /**
//    * @name setConfigPick
//    * @protected
//    * @throws TypeError
//    * @param {string[]} config
//    * @return {VicisConfig}
//    */
//   setConfigPick(config = []) {
//     if (!Array.isArray(config)) {
//       throw new TypeError("'pick' should be an array");
//     }
//     this.#pick = arrayUnique(config).map((value) => {
//       if (!isString(value)) {
//         throw new TypeError(`'pick' expect array of strings. Value: <${value.toString()}>.`);
//       }
//       return value;
//     });
//     return this;
//   }
//   /**
//    * @name setConfigRename
//    * @protected
//    * @throws TypeError
//    * @param {Object<string, function>} config
//    * @return {VicisConfig}
//    */
//   setConfigRename(config = {}) {
//     if (!isObjectLike(config)) {
//       throw new TypeError("'rename' should be an object");
//     }
//     const newConfig = {};
//     Object.keys(config).forEach((key) => {
//       if (!isString(key)) {
//         throw new TypeError(`'rename' expect object values to be strings. Not a string at key: <${key}>.`);
//       }
//       newConfig[key] = config[key];
//     });
//     const rename = Object.values(this.#rename);
//     const renameTo = arrayIntersect(rename, arrayUnique(rename));
//     if (rename.length !== renameTo.length) {
//       throw new Error(`'rename' has similar values: ${renameTo.join(",")}.`);
//     }
//     this.#rename = newConfig;
//     return this;
//   }
//   /**
//    * @name setConfigReplace
//    * @protected
//    * @throws TypeError
//    * @param {Object<string, function>} config
//    * @return {VicisConfig}
//    */
//   setConfigReplace(config = {}) {
//     if (!isObjectLike(config)) {
//       throw new TypeError("'replace' should be an object");
//     }
//     this.#replace = { ...config };
//     return this;
//   }
//   /**
//    * @name setConfigRequired
//    * @protected
//    * @throws TypeError
//    * @param {string[]} config
//    * @return {VicisConfig}
//    */
//   setConfigRequired(config = []) {
//     if (!Array.isArray(config)) {
//       throw new TypeError("'required' should be an array");
//     }
//     this.#required = arrayUnique(config).map((value) => {
//       if (!isString(value)) {
//         throw new TypeError(`'required' expect array of strings. Value: <${value.toString()}>.`);
//       }
//       return value;
//     });
//     return this;
//   }
//   /**
//    * @name setConfigTransform
//    * @protected
//    * @throws TypeError
//    * @param {Object<string, function>} config
//    * @return {VicisConfig}
//    */
//   setConfigTransform(config = {}) {
//     if (!isObjectLike(config)) {
//       throw new TypeError("'transform' should be an object");
//     }
//     const newConfig = {};
//     Object.keys(config).forEach((key) => {
//       if (!isFunction(config[key])) {
//         throw new TypeError(`'transform' expect object values to be functions. Not a function at key: <${key}>.`);
//       }
//       newConfig[key] = config[key];
//     });
//     this.#transform = newConfig;
//     return this;
//   }
//   /**
//    * @name checkConfig
//    * @protected
//    * @throws Error
//    * @return {VicisConfig}
//    */
//   checkConfig() {
//     if (arrayHasSame(this.#omit, this.#cast)) {
//       throw new Error(`'omit' has same keys as 'cast': ${arrayIntersect(this.#omit, this.#cast)}.`);
//     }
//     if (arrayHasSame(this.#omit, this.#defined)) {
//       throw new Error(`'omit' has same keys as 'defined': ${arrayIntersect(this.#omit, this.#defined)}.`);
//     }
//     if (arrayHasSame(this.#omit, this.#pick)) {
//       throw new Error(`'omit' has same keys as 'pick': ${arrayIntersect(this.#omit, this.#pick)}.`);
//     }
//     if (arrayHasSame(this.#omit, this.#rename)) {
//       throw new Error(`'omit' has same keys as 'rename': ${arrayIntersect(this.#omit, this.#rename)}.`);
//     }
//     if (arrayHasSame(this.#omit, this.#replace)) {
//       throw new Error(`'omit' has same keys as 'replace': ${arrayIntersect(this.#omit, this.#replace)}.`);
//     }
//     if (arrayHasSame(this.#omit, this.#required)) {
//       throw new Error(`'omit' has same keys as 'required': ${arrayIntersect(this.#omit, this.#required)}.`);
//     }
//     if (arrayHasSame(this.#omit, this.#transform)) {
//       throw new Error(`'omit' has same keys as 'transform': ${arrayIntersect(this.#omit, this.#transform)}.`);
//     }
//     if (arrayHasSame(this.#cast, this.#replace)) {
//       throw new Error(`'cast' has same keys as 'replace': ${arrayIntersect(this.#cast, this.#replace)}.`);
//     }
//     if (arrayHasSame(this.#cast, this.#transform)) {
//       throw new Error(`'cast' has same keys as 'transform': ${arrayIntersect(this.#cast, this.#transform)}.`);
//     }
//     if (arrayHasSame(this.#replace, this.#transform)) {
//       throw new Error(`'replace' has same keys as 'transform': ${arrayIntersect(this.#replace, this.#transform)}.`);
//     }
//     return this;
//   }
//   /**
//    * @name toJSON
//    * @public
//    * @returns {{}}
//    */
//   toJSON() {
//     return { ...this };
//   }
//   /**
//    * @name toString
//    * @public
//    * @returns {string}
//    */
//   toString() {
//     return JSON.stringify(this);
//   }
// }
