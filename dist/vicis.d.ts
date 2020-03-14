declare enum TYPES_ENUM {
  BOOLEAN = "boolean",
  FLAG = "flag",
  NUMERIC = "numeric",
  INTEGER = "integer",
  STRING = "string",
  JSON = "json",
}

export interface IVicisConfig {
  cast?: { [prop: string]: TYPES_ENUM };
  defaults?: { [prop: string]: any };
  defined?: string[];
  exclude?: Array<string | RegExp>;
  omit?: string;
  order?: string[];
  pick?: string[];
  sort?: boolean;
  rename?: { [prop: string]: string };
  replace?: { [prop: string]: any };
  required?: string[];
  transform?: { [prop: string]: (value: any, key: string, data: object) => any };
}

declare class Vicis {
  /**
   * @name constructor
   * @public
   * @constructor
   * @param {Object=} config
   * @param {Object=} data
   */
  public constructor(config?: IVicisConfig, data?: object);
  /**
   * @name getConfig
   * @public
   * @returns {Object}
   */
  public getConfig(): IVicisConfig;
  /**
   * @name resetConfig
   * @public
   * @returns {Vicis}
   */
  public resetConfig(): void;
  /**
   * @name config
   * @public
   * @throws TypeError
   * @param {Object=} config
   * @returns {Vicis}
   */
  public config(config: IVicisConfig): Vicis;
  /**
   * @name cast
   * @public
   * @throws TypeError
   * @param {Object=} propertyToType
   * @returns {Vicis}
   */
  public cast(propertyToType: { [prop: string]: TYPES_ENUM }): Vicis;
  /**
   * @name defaults
   * @public
   * @throws TypeError
   * @param {Object=} propertyDefaultValues
   * @returns {Vicis}
   */
  public defaults(propertyDefaultValues: { [prop: string]: any }): Vicis;
  /**
   * @name defined
   * @public
   * @throws TypeError
   * @param {Array.<string>=} propertiesMustBeDefined
   * @returns {Vicis}
   */
  public defined(propertiesMustBeDefined: string[]): Vicis;
  /**
   * @name exclude
   * @public
   * @throws TypeError
   * @param {Array.<string|RegExp>=} propertiesToExclude
   * @returns {Vicis}
   */
  public exclude(propertiesToExclude: string[] | RegExp[]): Vicis;
  /**
   * @name omit
   * @public
   * @throws TypeError
   * @param {Array.<string>=} propertiesToOmit
   * @returns {Vicis}
   */
  public omit(propertiesToOmit: string[]): Vicis;
  /**
   * @name pick
   * @public
   * @throws TypeError
   * @param {Array.<string>=} propertiesToPick
   * @returns {Vicis}
   */
  public pick(propertiesToPick: string[]): Vicis;
  /**
   * @name rename
   * @public
   * @throws TypeError
   * @param {Object=} renamePropertyFromTo
   * @returns {Vicis}
   */
  public rename(renamePropertyFromTo: { [prop: string]: string }): Vicis;
  /**
   * @name replace
   * @public
   * @throws TypeError
   * @param {Object=} replacePropertyValues
   * @returns {Vicis}
   */
  public replace(replacePropertyValues: { [prop: string]: any }): Vicis;
  /**
   * @name required
   * @public
   * @throws TypeError
   * @param {Array.<string>=} propertiesRequired
   * @returns {Vicis}
   */
  public required(propertiesRequired: string[]): Vicis;
  /**
   * @name sort
   * @public
   * @throws TypeError
   * @param {boolean=} sortProperties
   * @returns {Vicis}
   */
  public sort(sortProperties: boolean): Vicis;
  /**
   * @name transform
   * @public
   * @throws TypeError
   * @param {Object=} propertyValueTransformWith
   * @returns {Vicis}
   */
  public transform(propertyValueTransformWith: {
    [prop: string]: (value: any, key: string, data: object) => any | Function;
  }): Vicis;
  /**
   * @name validateConfig
   * @private
   * @throws Error
   * @returns {Vicis}
   */
  private validateConfig(): Vicis;
  /**
   * @name clear
   * @description Clear any data references and cached values
   * @public
   * @returns {Vicis}
   */
  public clear(): Vicis;
  /**
   * @name getData
   * @public
   * @returns {Object}
   */
  public getData(): object;
  /**
   * @name data
   * @public
   * @throws TypeError
   * @param {Object} dataToSerialize
   * @returns {Vicis}
   */
  public data(dataToSerialize): Vicis;
  /**
   * @name validateData
   * @private
   * @throws Error
   * @returns {Vicis}
   */
  private validateData(): Vicis;
  /**
   * @name toJSON
   * @public
   * @returns {Object}
   */
  public toJSON(): object;
  /**
   * @name toString
   * @public
   * @returns {string}
   */
  public toString(): string;
  /**
   * @name fromArray
   * @public
   * @param {Array.<Object>} collection
   * @returns {Array.<Object>}
   */
  public fromArray(collection): object[];
  /**
   * @name factory
   * @public
   * @static
   * @factory
   * @param {Object=} config
   * @param {Object=} data
   * @returns {Vicis}
   */
  public static factory(config?: IVicisConfig, data?: object): Vicis;
  /**
   * @name BOOLEAN
   * @public
   * @static
   * @type {String}
   */
  public static get BOOLEAN();
  /**
   * @name FLAG
   * @public
   * @static
   * @type {boolean}
   */
  public static get FLAG();
  /**
   * @name NUMERIC
   * @public
   * @static
   * @type {String}
   */
  public static get NUMERIC();
  /**
   * @name INTEGER
   * @public
   * @static
   * @type {String}
   */
  public static get INTEGER();
  /**
   * @name STRING
   * @public
   * @static
   * @type {String}
   */
  public static get STRING();
  /**
   * @name JSON
   * @public
   * @static
   * @type {String}
   */
  public static get JSON();
}

/**
 * @name cast
 * @throws TypeError
 * @param {Object} data
 * @param {Object.<string, string>=} propertyToType
 * @returns {Object}
 */
declare function cast(data: object, propertyToType: { [prop: string]: TYPES_ENUM }): object;

/**
 * @name defaults
 * @throws TypeError
 * @param {Object} data
 * @param {Object.<string, *>=} propertyDefaultValues
 * @returns {Object}
 */
declare function defaults(data: object, propertyDefaultValues: { [prop: string]: any }): object;

/**
 * @name defined
 * @throws TypeError
 * @param {Object} data
 * @param {Array.<string>=} propertiesMustBeDefined
 * @returns {Object}
 */
declare function defined(data: object, propertiesMustBeDefined: string[]): object;

/**
 * @name exclude
 * @throws TypeError
 * @param {Object} data
 * @param {Array.<string|RegExp>=} propertiesToExclude
 * @returns {Object}
 */
declare function exclude(data: object, propertiesToExclude: string[] | RegExp[]): object;

/**
 * @name omit
 * @throws TypeError
 * @param {Object} data
 * @param {Array.<string>=} propertiesToOmit
 * @returns {Object}
 */
declare function omit(data: object, propertiesToOmit: string[]): object;

/**
 * @name order
 * @throws TypeError
 * @param {Object} data
 * @param {Array.<string>=} propertiesToStreamline
 * @param {boolean=} sort
 * @returns {Object}
 */
declare function order(data: object, propertiesToStreamline: string[], sort: boolean): object;

/**
 * @name pick
 * @throws TypeError
 * @param {Object} data
 * @param {Array.<string>=} propertiesToPick
 * @returns {Object}
 */
declare function pick(data: object, propertiesToPick: string[]): object;

/**
 * @name rename
 * @param {Object} data
 * @param {Object.<string, string>=} renamePropertyFromTo
 * @returns {Object}
 */
declare function rename(data: object, renamePropertyFromTo: { [prop: string]: string }): object;

/**
 * @name replace
 * @throws TypeError
 * @param {Object} data
 * @param {Object.<string, *>=} replacePropertyValues
 * @returns {Object}
 */
declare function replace(data: object, replacePropertyValues: { [prop: string]: any }): object;

/**
 * @name required
 * @throws TypeError
 * @param {Object} data
 * @param {Array.<string>=} propertiesRequired
 * @returns {Object}
 */
declare function required(data: object, propertiesRequired: string[]): object;

/**
 * @name transform
 * @param {Object} data
 * @param {Object.<string, function>=} propertyValueTransformWith
 * @returns {Object}
 */
declare function transform(
  data: object,
  propertyValueTransformWith: {
    [prop: string]: (value: any, key: string, data: object) => any | Function,
  },
): object;

export { TYPES_ENUM, Vicis, cast, defaults, defined, omit, order, pick, rename, replace, required, transform };
