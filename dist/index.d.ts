export interface IFunction {
  (...args: unknown[]): unknown;
}
export interface IObject extends Object {
  [key: string]: any;
}
export enum ECastType {
  BOOLEAN = "boolean",
  FLAG = "flag",
  INTEGER = "integer",
  JSON = "json",
  NUMERIC = "numeric",
  STRING = "string",
}
export interface ICast {
  [key: string]: ECastType;
}
export interface IConfigCallback {
  (model: IObject): IObject;
}
export interface IDefaults {
  [key: string]: unknown;
}
export interface IDefined extends Array<string> {
  [index: number]: string;
}
export interface IExclude extends Array<string | RegExp> {
  [index: number]: string | RegExp;
}
export interface IOmit extends Array<string> {
  [index: number]: string;
}
export interface IOrder extends Array<string> {
  [index: number]: string;
}
export interface IPick extends Array<string> {
  [index: number]: string;
}
export interface IRename {
  [key: string]: string;
}
export interface IReplace {
  [key: string]: unknown;
}
export interface IRequired extends Array<string> {
  [index: number]: string;
}
export interface ITransform {
  [key: string]: (value: unknown, key: string, data: IObject) => unknown;
}
export enum ESort {
  Default = "asc",
  No = "no",
  Yes = "asc",
}
export interface IConfigObject {
  cast?: ICast;
  defaults?: IDefaults;
  defined?: IDefined;
  exclude?: IExclude;
  omit?: IOmit;
  order?: IOrder;
  pick?: IPick;
  sort?: ESort;
  rename?: IRename;
  replace?: IReplace;
  required?: IRequired;
  transform?: ITransform;
}
export type IConfig = IConfigObject | IConfigCallback;
export interface IConfigObjectFull {
  cast: ICast;
  defaults: IDefaults;
  defined: IDefined;
  exclude: IExclude;
  omit: IOmit;
  order: IOrder;
  pick: IPick;
  sort: ESort;
  rename: IRename;
  replace: IReplace;
  required: IRequired;
  transform: ITransform;
}
export const CAST_TYPE: {
  BOOLEAN: string;
  FLAG: string;
  INTEGER: string;
  JSON: string;
  NUMERIC: string;
  STRING: string;
};
/**
 * @name cast
 * @throws TypeError
 * @param {Object} data
 * @param {Object.<string, string>=} propertyToType
 * @returns {Object}
 */
export function cast(data: IObject, propertyToType: ICast): IObject;
/**
 * @name defaults
 * @throws TypeError
 * @param {Object} data
 * @param {Object.<string, *>=} propertyDefaultValues
 * @returns {Object}
 */
export function defaults(data: IObject, propertyDefaultValues?: IDefaults): IObject;
/**
 * @name defined
 * @throws TypeError
 * @param {Object} data
 * @param {Array.<string>=} propertiesMustBeDefined
 * @returns {Object}
 */
export function defined(data: IObject, propertiesMustBeDefined?: IDefined): IObject;
/**
 * @name exclude
 * @throws TypeError
 * @param {Object} data
 * @param {Array.<string|RegExp>=} propertiesToExclude
 * @returns {Object}
 */
export function exclude(data: IObject, propertiesToExclude?: IExclude): IObject;
/**
 * @name omit
 * @throws TypeError
 * @param {Object} data
 * @param {Array.<string>=} propertiesToOmit
 * @returns {Object}
 */
export function omit(data: IObject, propertiesToOmit?: IOmit): IObject;
/**
 * @name order
 * @throws TypeError
 * @param {Object} data
 * @param {Array.<string>=} propertiesToStreamline
 * @param {boolean=} sort
 * @returns {Object}
 */
export function order(data: IObject, propertiesToStreamline?: IOrder, sort?: boolean | ESort): IObject;
/**
 * @name pick
 * @throws TypeError
 * @param {Object} data
 * @param {Array.<string>=} propertiesToPick
 * @returns {Object}
 */
export function pick(data: IObject, propertiesToPick?: IPick): IObject;
/**
 * @name rename
 * @param {Object} data
 * @param {Object.<string, string>=} renamePropertyFromTo
 * @returns {Object}
 */
export function rename(data: IObject, renamePropertyFromTo?: IRename): IObject;
/**
 * @name replace
 * @throws TypeError
 * @param {Object} data
 * @param {Object.<string, *>=} replacePropertyValues
 * @returns {Object}
 */
export function replace(data: IObject, replacePropertyValues?: IReplace): IObject;
/**
 * @name required
 * @throws TypeError
 * @param {Object} data
 * @param {Array.<string>=} propertiesRequired
 * @returns {Object}
 */
export function required(data: IObject, propertiesRequired?: IRequired): IObject;
/**
 * @name transform
 * @param {Object} data
 * @param {Object.<string, function>=} propertyValueTransformWith
 * @returns {Object}
 */
export function transform(data: IObject, propertyValueTransformWith?: ITransform): IObject;
export const CONFIG_FIELDS: string[];
export class AggregateError extends Error {
  readonly name = "AggregateError";
  errors: Error[];
  /**
   * @param {Array<Error>} errors
   * @param {String} message
   */
  constructor(errors: Error[], message?: string);
}
export class ValidationError extends Error {
  constructor(message: string);
}
export class Vicis {
  #private;
  /**
   * @name validateConfig
   * @protected
   * @method
   * @throws Error
   * @returns {Vicis}
   */
  protected validateConfig(): this;
  /**
   * @name validateData
   * @private
   * @method
   * @throws Error
   * @returns {Vicis}
   */
  protected validateData(): this;
  /**
   * @name constructor
   * @public
   * @constructor
   * @param {Function|Object=} config
   * @param {Object=} data
   * @throws AggregateError
   */
  constructor(config?: IConfig, data?: IObject);
  /**
   * @name factory
   * @public
   * @static
   * @factory
   * @param {Function|Object=} config
   * @param {Object=} data
   * @returns {Vicis}
   */
  static factory(config?: IConfig, data?: IObject): Vicis;
  /**
   * @name from
   * @public
   * @static
   * @throws TypeError
   * @param {Object} data
   * @param {Object=} config
   * @returns {Object}
   */
  static from(data: IObject, config?: IConfig): IObject;
  /**
   * @name fromArray
   * @static
   * @public
   * @param {Array.<Object>} collection
   * @param {Object=} config
   * @returns {Array.<Object>}
   */
  static fromArray(collection: IObject[], config?: IConfig): IObject[];
  /**
   * @name BOOLEAN
   * @public
   * @static
   * @type {String}
   */
  static get BOOLEAN(): ECastType;
  /**
   * @name FLAG
   * @public
   * @static
   * @type {String}
   */
  static get FLAG(): ECastType;
  /**
   * @name NUMERIC
   * @public
   * @static
   * @type {String}
   */
  static get NUMERIC(): ECastType;
  /**
   * @name INTEGER
   * @public
   * @static
   * @type {String}
   */
  static get INTEGER(): ECastType;
  /**
   * @name STRING
   * @public
   * @static
   * @type {String}
   */
  static get STRING(): ECastType;
  /**
   * @name JSON
   * @public
   * @static
   * @type {String}
   */
  static get JSON(): ECastType;
  /**
   * @name getConfig
   * @public
   * @returns {Object}
   */
  getConfig(): {
    cast: ICast;
    defaults: IDefaults;
    defined: IDefined;
    exclude: IExclude;
    omit: IOmit;
    order: IOrder;
    pick: IPick;
    sort: ESort;
    rename: IRename;
    replace: IReplace;
    required: IRequired;
    transform: ITransform;
  };
  /**
   * @name resetConfig
   * @public
   * @returns {Vicis}
   */
  resetConfig(): this;
  /**
   * @name testConfig
   * @public
   * @static
   * @throws AggregateError
   * @param {Function|Object=} config
   * @returns {Object}
   * @since 1.6.0
   */
  static testConfig(config: IConfig): IConfigObject;
  /**
   * @name config
   * @public
   * @throws AggregateError|TypeError
   * @param {Function|Object=} config
   * @returns {Vicis}
   */
  config(config?: IConfig): this;
  /**
   * @name cast
   * @public
   * @throws TypeError
   * @param {Object=} propertyToType
   * @returns {Vicis}
   */
  cast(propertyToType?: ICast): this;
  /**
   * @name defaults
   * @public
   * @throws TypeError
   * @param {Object=} propertyDefaultValues
   * @returns {Vicis}
   */
  defaults(propertyDefaultValues?: IDefaults): this;
  /**
   * @name defined
   * @public
   * @throws TypeError
   * @param {Array.<string>=} propertiesMustBeDefined
   * @returns {Vicis}
   */
  defined(propertiesMustBeDefined?: IDefined): this;
  /**
   * @name exclude
   * @public
   * @throws TypeError
   * @param {Array.<string|RegExp>=} propertiesToExclude
   * @returns {Vicis}
   */
  exclude(propertiesToExclude?: IExclude): this;
  /**
   * @name omit
   * @public
   * @throws TypeError
   * @param {Array.<string>=} propertiesToOmit
   * @returns {Vicis}
   */
  omit(propertiesToOmit?: IOmit): this;
  /**
   * @name order
   * @public
   * @throws TypeError
   * @param {Array.<string>=} propertiesToStreamline
   * @returns {Vicis}
   */
  order(propertiesToStreamline?: IOrder): this;
  /**
   * @name pick
   * @public
   * @throws TypeError
   * @param {Array.<string>=} propertiesToPick
   * @returns {Vicis}
   */
  pick(propertiesToPick?: IPick): this;
  /**
   * @name rename
   * @public
   * @throws TypeError
   * @param {Object=} renamePropertyFromTo
   * @returns {Vicis}
   */
  rename(renamePropertyFromTo?: IRename): this;
  /**
   * @name replace
   * @public
   * @throws TypeError
   * @param {Object=} replacePropertyValues
   * @returns {Vicis}
   */
  replace(replacePropertyValues?: IReplace): this;
  /**
   * @name required
   * @public
   * @throws TypeError
   * @param {Array.<string>=} propertiesRequired
   * @returns {Vicis}
   */
  required(propertiesRequired?: IRequired): this;
  /**
   * @name sort
   * @public
   * @throws TypeError
   * @param {boolean=} sortProperties
   * @returns {Vicis}
   */
  sort(sortProperties?: boolean | ESort): Vicis;
  /**
   * @name transform
   * @public
   * @throws TypeError
   * @param {Object=} propertyValueTransformWith
   * @returns {Vicis}
   */
  transform(propertyValueTransformWith?: ITransform): Vicis;
  /**
   * @name getData
   * @public
   * @returns {Object}
   */
  getData(): IObject;
  /**
   * @name data
   * @public
   * @throws TypeError
   * @param {Object} dataToSerialize
   * @returns {Vicis}
   */
  data(dataToSerialize: IObject): Vicis;
  /**
   * @name clear
   * @description Clear any data references and cached values
   * @public
   * @returns {Vicis}
   */
  clear(): Vicis;
  /**
   * @name toJSON
   * @public
   * @returns {Object}
   */
  toJSON(): IObject;
  /**
   * @name toString
   * @public
   * @returns {string}
   */
  toString(): string;
  /**
   * @name fromArray
   * @public
   * @param {Array.<Object>} collection
   * @returns {Array.<Object>}
   */
  fromArray(collection: IObject[]): IObject[];
}
