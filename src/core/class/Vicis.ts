import { IFunction } from "../../interface/common/IFunction";
import { IObject } from "../../interface/common/IObject";

import { ICast } from "../../interface/config/ICast";
import { IConfig } from "../../interface/config/IConfig";
import { IConfigObject } from "../../interface/config/IConfigObject";
import { IConfigObjectFull } from "../../interface/config/IConfigObjectFull";
import { IDefaults } from "../../interface/config/IDefaults";
import { IDefined } from "../../interface/config/IDefined";
import { IExclude } from "../../interface/config/IExclude";
import { IOmit } from "../../interface/config/IOmit";
import { IOrder } from "../../interface/config/IOrder";
import { IPick } from "../../interface/config/IPick";
import { IRename } from "../../interface/config/IRename";
import { IReplace } from "../../interface/config/IReplace";
import { IRequired } from "../../interface/config/IRequired";
import { ITransform } from "../../interface/config/ITransform";

import { ECastType } from "../../const/ECastType";
import { CONFIG_FIELDS } from "../../const/CONFIG_FIELDS";
import { ESort } from "../../const/ESort";

import { AggregateError } from "../errors/AggregateError";
import { ValidationError } from "../errors/ValidationError";

import { arrayBasicIntersect } from "../../util/array/basic/intersect";
import { arrayGetDifference } from "../../util/array/get/difference";
import { arrayHasSame } from "../../util/array/basic/hasSame";
import { castToJson } from "../../util/cast/to/json";
import { checkIsObjectLike } from "../../util/check/isObjectLike";
import { clone } from "../../util/variable/clone";
import { isFunction } from "../../util/is/function";
import { jsonStringify } from "../../util/json/stringify";
import { objectGetKeys } from "../../util/object/get/keys";
import { objectGetProperty } from "../../util/object/get/property";

import { castConfig } from "../cast/castConfig";
import { castData } from "../cast/castData";
import { defaultsConfig } from "../defaults/defaultsConfig";
import { defaultsData } from "../defaults/defaultsData";
import { definedConfig } from "../defined/definedConfig";
import { definedData } from "../defined/definedData";
import { excludeConfig } from "../exclude/excludeConfig";
import { excludeData } from "../exclude/excludeData";
import { omitConfig } from "../omit/omitConfig";
import { omitData } from "../omit/omitData";
import { orderConfig } from "../order/orderConfig";
import { orderData } from "../order/orderData";
import { pickConfig } from "../pick/pickConfig";
import { pickData } from "../pick/pickData";
import { renameConfig } from "../rename/renameConfig";
import { renameData } from "../rename/renameData";
import { replaceConfig } from "../replace/replaceConfig";
import { replaceData } from "../replace/replaceData";
import { requiredConfig } from "../required/requiredConfig";
import { requiredData } from "../required/requiredData";
import { transformConfig } from "../transform/transformConfig";
import { transformData } from "../transform/transformData";

import { convertFunctionToConfig } from "../config/functionToConfig";

import { objectCreateEmpty } from "../../util/object/createEmpty";
import { sortAsBoolean } from "../config/sortAsBoolean";

export class Vicis {
  //#region Config Fields
  /**
   * @name cast
   * @private
   * @type {Object}
   */
  #cast: ICast;
  /**
   * @name defaults
   * @private
   * @type {Object}
   */
  #defaults: IDefaults;
  /**
   * @name defined
   * @private
   * @type {Array.<string>}
   */
  #defined: IDefined;
  /**
   * @name exclude
   * @private
   * @type {Array.<string|RegExp>}
   */
  #exclude: IExclude;
  /**
   * @name omit
   * @private
   * @type {Array.<string>}
   */
  #omit: IOmit;
  /**
   * @name order
   * @private
   * @type {Array.<string>}
   */
  #order: IOrder;
  /**
   * @name pick
   * @private
   * @type {Array.<string>}
   */
  #pick: IPick;
  /**
   * @name sort
   * @private
   * @type {boolean|string}
   */
  #sort: boolean | ESort;
  /**
   * @name rename
   * @private
   * @type {Object}
   */
  #rename: IRename;
  /**
   * @name replace
   * @private
   * @type {Object}
   */
  #replace: IReplace;
  /**
   * @name required
   * @private
   * @type {Array.<string>}
   */
  #required: IRequired;
  /**
   * @name transform
   * @private
   * @type {Object}
   */
  #transform: ITransform;
  //#endregion

  //#region Data Fields
  /**
   * @name dataCache
   * @private
   * @type {Object}
   */
  #dataCache: IObject;
  /**
   * @name dataOriginal
   * @private
   * @type {Object}
   */
  #dataOriginal?: IObject;
  //#endregion

  //#region Private Methods
  /**
   * @name validateConfig
   * @protected
   * @method
   * @throws Error
   * @returns {Vicis}
   */
  protected validateConfig() {
    const cast = objectGetKeys(this.#cast);
    const rename = objectGetKeys(this.#rename);
    const replace = objectGetKeys(this.#replace);
    const transform = objectGetKeys(this.#transform);
    if (arrayHasSame(this.#omit, cast)) {
      throw new ValidationError(
        `'omit' has same keys as 'cast': ${
          arrayBasicIntersect(this.#omit, cast)
        }.`,
      );
    }
    if (arrayHasSame(this.#omit, this.#defined)) {
      throw new ValidationError(
        `'omit' has same keys as 'defined': ${
          arrayBasicIntersect(this.#omit, this.#defined)
        }.`,
      );
    }
    if (arrayHasSame(this.#omit, this.#pick)) {
      throw new ValidationError(
        `'omit' has same keys as 'pick': ${
          arrayBasicIntersect(this.#omit, this.#pick)
        }.`,
      );
    }
    if (arrayHasSame(this.#omit, rename)) {
      throw new ValidationError(
        `'omit' has same keys as 'rename': ${
          arrayBasicIntersect(this.#omit, rename)
        }.`,
      );
    }
    if (arrayHasSame(this.#omit, replace)) {
      throw new ValidationError(
        `'omit' has same keys as 'replace': ${
          arrayBasicIntersect(this.#omit, replace)
        }.`,
      );
    }
    if (arrayHasSame(this.#omit, this.#required)) {
      throw new ValidationError(
        `'omit' has same keys as 'required': ${
          arrayBasicIntersect(this.#omit, this.#required)
        }.`,
      );
    }
    if (arrayHasSame(this.#omit, transform)) {
      throw new ValidationError(
        `'omit' has same keys as 'transform': ${
          arrayBasicIntersect(this.#omit, transform)
        }.`,
      );
    }
    if (arrayHasSame(cast, replace)) {
      throw new ValidationError(
        `'cast' has same keys as 'replace': ${
          arrayBasicIntersect(cast, replace)
        }.`,
      );
    }
    if (arrayHasSame(cast, transform)) {
      throw new ValidationError(
        `'cast' has same keys as 'transform': ${
          arrayBasicIntersect(cast, transform)
        }.`,
      );
    }
    if (arrayHasSame(replace, transform)) {
      throw new ValidationError(
        `'replace' has same keys as 'transform': ${
          arrayBasicIntersect(replace, transform)
        }.`,
      );
    }
    return this;
  }
  /**
   * @name validateData
   * @private
   * @method
   * @throws Error
   * @returns {Vicis}
   */
  protected validateData() {
    if (this.#dataOriginal === undefined) {
      return this;
    }
    if (
      "toObject" in this.#dataOriginal &&
      isFunction(this.#dataOriginal.toObject)
    ) {
      this.#dataCache = (this.#dataOriginal.toObject as () => IObject)();
    } else if (
      "toJSON" in this.#dataOriginal && isFunction(this.#dataOriginal.toJSON)
    ) {
      this.#dataCache = (this.#dataOriginal.toJSON as () => IObject)();
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
  }
  //#endregion

  //#region Initialization Methods
  /**
   * @name constructor
   * @public
   * @constructor
   * @param {Function|Object=} config
   * @param {Object=} data
   * @throws AggregateError
   */
  constructor(config: IConfig = {}, data?: IObject) {
    this.#cast = objectCreateEmpty() as unknown as ICast;
    this.#defaults = objectCreateEmpty() as unknown as IDefaults;
    this.#defined = [];
    this.#exclude = [];
    this.#omit = [];
    this.#order = [];
    this.#pick = [];
    this.#rename = objectCreateEmpty() as unknown as IRename;
    this.#replace = <IReplace> objectCreateEmpty();
    this.#required = [];
    this.#sort = ESort.Default;
    this.#transform = objectCreateEmpty() as unknown as ITransform;
    this.#dataCache = objectCreateEmpty() as unknown as IObject;
    this.#dataOriginal = undefined;
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
   * @param {Function|Object=} config
   * @param {Object=} data
   * @returns {Vicis}
   */
  static factory(config?: IConfig, data?: IObject) {
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
  static from(data: IObject, config?: IConfig) {
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
  static fromArray(collection: IObject[], config?: IConfig) {
    const serializer = Vicis.factory(config);
    return Array.from(collection).map((data) =>
      serializer.data(data).getData()
    );
  }

  /**
   * @name BOOLEAN
   * @public
   * @static
   * @type {String}
   */
  static get BOOLEAN(): ECastType {
    return ECastType.BOOLEAN;
  }

  /**
   * @name FLAG
   * @public
   * @static
   * @type {String}
   */
  static get FLAG(): ECastType {
    return ECastType.FLAG;
  }

  /**
   * @name NUMERIC
   * @public
   * @static
   * @type {String}
   */
  static get NUMERIC(): ECastType {
    return ECastType.NUMERIC;
  }

  /**
   * @name INTEGER
   * @public
   * @static
   * @type {String}
   */
  static get INTEGER(): ECastType {
    return ECastType.INTEGER;
  }

  /**
   * @name STRING
   * @public
   * @static
   * @type {String}
   */
  static get STRING(): ECastType {
    return ECastType.STRING;
  }

  /**
   * @name JSON
   * @public
   * @static
   * @type {String}
   */
  static get JSON(): ECastType {
    return ECastType.JSON;
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
    this.#sort = ESort.Default;
    this.#rename = {};
    this.#replace = {};
    this.#required = [];
    this.#transform = {};
    return this;
  }

  /**
   * @name testConfig
   * @public
   * @static
   * @throws AggregateError
   * @param {Function|Object=} config
   * @returns {Object}
   * @since 1.6.0
   */
  static testConfig(config: IConfig): IConfigObject {
    let configFull: IConfigObjectFull;
    if (isFunction(config)) {
      configFull = convertFunctionToConfig(config as IFunction);
    } else {
      configFull = config as unknown as IConfigObjectFull;
    }
    if (!checkIsObjectLike(configFull)) {
      throw new AggregateError(
        [new TypeError("Config should be an object")],
        "Configuration has errors",
      );
    }
    const diff = arrayGetDifference(objectGetKeys(configFull), CONFIG_FIELDS);
    if (diff.length) {
      throw new AggregateError(
        [new TypeError(`Config has unknown fields: '${diff.join("', '")}'.`)],
        "Configuration has errors",
      );
    }
    const cast = objectGetKeys(objectGetProperty(configFull, "cast", {}));
    const rename = objectGetKeys(objectGetProperty(configFull, "rename", {}));
    const replace = objectGetKeys(objectGetProperty(configFull, "replace", {}));
    const transform = objectGetKeys(
      objectGetProperty(configFull, "transform", {}),
    );
    const errors = [];
    if ("omit" in configFull && arrayHasSame(configFull.omit, cast)) {
      errors.push(
        new ValidationError(
          `'omit' has same keys as 'cast': ${
            arrayBasicIntersect(configFull.omit, cast)
          }.`,
        ),
      );
    }
    if (
      "omit" in configFull && "defined" in configFull &&
      arrayHasSame(configFull.omit, configFull.defined)
    ) {
      errors.push(
        new ValidationError(
          `'omit' has same keys as 'defined': ${
            arrayBasicIntersect(configFull.omit, configFull.defined)
          }.`,
        ),
      );
    }
    if (
      "omit" in configFull && "pick" in configFull &&
      arrayHasSame(configFull.omit, configFull.pick)
    ) {
      errors.push(
        new ValidationError(
          `'omit' has same keys as 'pick': ${
            arrayBasicIntersect(configFull.omit, configFull.pick)
          }.`,
        ),
      );
    }
    if ("omit" in configFull && arrayHasSame(configFull.omit, rename)) {
      errors.push(
        new ValidationError(
          `'omit' has same keys as 'rename': ${
            arrayBasicIntersect(configFull.omit, rename)
          }.`,
        ),
      );
    }
    if ("omit" in configFull && arrayHasSame(configFull.omit, replace)) {
      errors.push(
        new ValidationError(
          `'omit' has same keys as 'replace': ${
            arrayBasicIntersect(configFull.omit, replace)
          }.`,
        ),
      );
    }
    if (
      "omit" in configFull && "required" in configFull &&
      arrayHasSame(configFull.omit, configFull.required)
    ) {
      errors.push(
        new ValidationError(
          `'omit' has same keys as 'required': ${
            arrayBasicIntersect(configFull.omit, configFull.required)
          }.`,
        ),
      );
    }
    if ("omit" in configFull && arrayHasSame(configFull.omit, transform)) {
      errors.push(
        new ValidationError(
          `'omit' has same keys as 'transform': ${
            arrayBasicIntersect(configFull.omit, transform)
          }.`,
        ),
      );
    }
    if (arrayHasSame(cast, replace)) {
      errors.push(
        new ValidationError(
          `'cast' has same keys as 'replace': ${
            arrayBasicIntersect(cast, replace)
          }.`,
        ),
      );
    }
    if (arrayHasSame(cast, transform)) {
      errors.push(
        new ValidationError(
          `'cast' has same keys as 'transform': ${
            arrayBasicIntersect(cast, transform)
          }.`,
        ),
      );
    }
    if (arrayHasSame(replace, transform)) {
      errors.push(
        new ValidationError(
          `'replace' has same keys as 'transform': ${
            arrayBasicIntersect(replace, transform)
          }.`,
        ),
      );
    }
    if (errors.length) {
      throw new AggregateError(
        errors,
        [
          "Configuration has errors.",
          ...errors.map((error, index) => `${index + 1}). ${error.message}`),
        ].join("\n"),
      );
    }
    return { ...configFull };
  }

  /**
   * @name config
   * @public
   * @throws AggregateError|TypeError
   * @param {Function|Object=} config
   * @returns {Vicis}
   */
  config(config: IConfig = {}) {
    let configFull: IConfigObjectFull;
    if (isFunction(config)) {
      configFull = convertFunctionToConfig(config as IFunction);
    } else {
      configFull = config as unknown as IConfigObjectFull;
    }
    if (!checkIsObjectLike(configFull)) {
      throw new TypeError("Config should be an object");
    }
    const diff = arrayGetDifference(objectGetKeys(configFull), CONFIG_FIELDS);
    if (diff.length) {
      throw new TypeError(`Config has unknown fields: '${diff.join("', '")}'.`);
    }
    Vicis.testConfig(configFull);
    this.resetConfig();
    this.sort(configFull.sort);
    this.omit(configFull.omit);
    this.cast(configFull.cast);
    this.defined(configFull.defined);
    this.pick(configFull.pick);
    this.rename(configFull.rename);
    this.replace(configFull.replace);
    this.required(configFull.required);
    this.transform(configFull.transform);
    this.defaults(configFull.defaults);
    this.exclude(configFull.exclude);
    this.order(configFull.order);
    this.validateConfig();
    this.validateData();
    return this;
  }

  /**
   * @name cast
   * @public
   * @throws TypeError
   * @param {Object=} propertyToType
   * @returns {Vicis}
   */
  cast(propertyToType: ICast = {}) {
    this.#cast = castConfig(propertyToType);
    this.validateConfig();
    this.validateData();
    return this;
  }

  /**
   * @name defaults
   * @public
   * @throws TypeError
   * @param {Object=} propertyDefaultValues
   * @returns {Vicis}
   */
  defaults(propertyDefaultValues: IDefaults = {}) {
    this.#defaults = defaultsConfig(propertyDefaultValues); // do not deep clone!
    this.validateConfig();
    this.validateData();
    return this;
  }

  /**
   * @name defined
   * @public
   * @throws TypeError
   * @param {Array.<string>=} propertiesMustBeDefined
   * @returns {Vicis}
   */
  defined(propertiesMustBeDefined: IDefined = []) {
    this.#defined = definedConfig(propertiesMustBeDefined);
    this.validateConfig();
    this.validateData();
    return this;
  }

  /**
   * @name exclude
   * @public
   * @throws TypeError
   * @param {Array.<string|RegExp>=} propertiesToExclude
   * @returns {Vicis}
   */
  exclude(propertiesToExclude: IExclude = []) {
    this.#exclude = excludeConfig(propertiesToExclude);
    this.validateConfig();
    this.validateData();
    return this;
  }

  /**
   * @name omit
   * @public
   * @throws TypeError
   * @param {Array.<string>=} propertiesToOmit
   * @returns {Vicis}
   */
  omit(propertiesToOmit: IOmit = []) {
    this.#omit = omitConfig(propertiesToOmit);
    this.validateConfig();
    this.validateData();
    return this;
  }

  /**
   * @name order
   * @public
   * @throws TypeError
   * @param {Array.<string>=} propertiesToStreamline
   * @returns {Vicis}
   */
  order(propertiesToStreamline: IOrder = []) {
    this.#order = orderConfig(propertiesToStreamline);
    this.validateConfig();
    this.validateData();
    return this;
  }

  /**
   * @name pick
   * @public
   * @throws TypeError
   * @param {Array.<string>=} propertiesToPick
   * @returns {Vicis}
   */
  pick(propertiesToPick: IPick = []) {
    this.#pick = pickConfig(propertiesToPick);
    this.validateConfig();
    this.validateData();
    return this;
  }

  /**
   * @name rename
   * @public
   * @throws TypeError
   * @param {Object=} renamePropertyFromTo
   * @returns {Vicis}
   */
  rename(renamePropertyFromTo: IRename = {}) {
    this.#rename = renameConfig(renamePropertyFromTo);
    this.validateConfig();
    this.validateData();
    return this;
  }

  /**
   * @name replace
   * @public
   * @throws TypeError
   * @param {Object=} replacePropertyValues
   * @returns {Vicis}
   */
  replace(replacePropertyValues: IReplace = {}) {
    this.#replace = replaceConfig(replacePropertyValues); // do not deep clone!
    this.validateConfig();
    this.validateData();
    return this;
  }

  /**
   * @name required
   * @public
   * @throws TypeError
   * @param {Array.<string>=} propertiesRequired
   * @returns {Vicis}
   */
  required(propertiesRequired: IRequired = []) {
    this.#required = requiredConfig(propertiesRequired);
    this.validateConfig();
    this.validateData();
    return this;
  }

  /**
   * @name sort
   * @public
   * @throws TypeError
   * @param {boolean=} sortProperties
   * @returns {Vicis}
   */
  sort(sortProperties: boolean | ESort = ESort.Default): Vicis {
    if (
      typeof sortProperties !== "boolean" &&
      !(Object.values(ESort).includes(sortProperties as ESort))
    ) {
      throw new TypeError("'sort' should be a boolean");
    }
    if (sortAsBoolean(sortProperties)) {
      this.#sort = ESort.Yes;
    } else {
      this.#sort = ESort.No;
    }
    this.validateData();
    return this;
  }

  /**
   * @name transform
   * @public
   * @throws TypeError
   * @param {Object=} propertyValueTransformWith
   * @returns {Vicis}
   */
  transform(propertyValueTransformWith: ITransform = {}): Vicis {
    this.#transform = transformConfig(propertyValueTransformWith); // do not deep clone!
    this.validateConfig();
    this.validateData();
    return this;
  }

  //#endregion

  //#region Public Data Methods
  /**
   * @name getData
   * @public
   * @returns {Object}
   */
  getData(): IObject {
    return <IObject> clone(this.#dataCache);
  }

  /**
   * @name data
   * @public
   * @throws TypeError
   * @param {Object} dataToSerialize
   * @returns {Vicis}
   */
  data(dataToSerialize: IObject): Vicis {
    if (!checkIsObjectLike(dataToSerialize)) {
      throw new TypeError("Data should be an object");
    }
    this.#dataOriginal = dataToSerialize; // keep reference
    this.validateData();
    return this;
  }

  /**
   * @name clear
   * @description Clear any data references and cached values
   * @public
   * @returns {Vicis}
   */
  clear(): Vicis {
    this.#dataCache = objectCreateEmpty();
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
  toJSON(): IObject {
    return this.getData();
  }

  /**
   * @name toString
   * @public
   * @returns {string}
   */
  toString(): string {
    return jsonStringify(this.toJSON());
  }

  /**
   * @name fromArray
   * @public
   * @param {Array.<Object>} collection
   * @returns {Array.<Object>}
   */
  fromArray(collection: IObject[]): IObject[] {
    return Array.from(collection).map((data) => this.data(data).toJSON());
  }

  //#endregion
}
