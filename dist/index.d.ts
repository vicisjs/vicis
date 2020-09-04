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
  [key: string]: string | ECastType;
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
  sort?: boolean | ESort;
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
  sort: boolean | ESort;
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
  public constructor(config?: IConfig, data?: IObject);
  /**
   * @name factory
   * @public
   * @static
   * @factory
   * @param {Function|Object=} config
   * @param {Object=} data
   * @returns {Vicis}
   */
  public static factory(config?: IConfig, data?: IObject): Vicis;
  /**
   * @name from
   * @public
   * @static
   * @throws TypeError
   * @param {Object} data
   * @param {Object=} config
   * @returns {Object}
   */
  public static from(data: IObject, config?: IConfig): IObject;
  /**
   * @name fromArray
   * @static
   * @public
   * @param {Array.<Object>} collection
   * @param {Object=} config
   * @returns {Array.<Object>}
   */
  public static fromArray(collection: IObject[], config?: IConfig): IObject[];
  /**
   * @name BOOLEAN
   * @public
   * @static
   * @type {String}
   */
  public static get BOOLEAN(): ECastType;
  /**
   * @name FLAG
   * @public
   * @static
   * @type {String}
   */
  public static get FLAG(): ECastType;
  /**
   * @name NUMERIC
   * @public
   * @static
   * @type {String}
   */
  public static get NUMERIC(): ECastType;
  /**
   * @name INTEGER
   * @public
   * @static
   * @type {String}
   */
  public static get INTEGER(): ECastType;
  /**
   * @name STRING
   * @public
   * @static
   * @type {String}
   */
  public static get STRING(): ECastType;
  /**
   * @name JSON
   * @public
   * @static
   * @type {String}
   */
  public static get JSON(): ECastType;
  /**
   * @name getConfig
   * @public
   * @returns {Object}
   */
  public getConfig(): {
    cast: ICast;
    defaults: IDefaults;
    defined: IDefined;
    exclude: IExclude;
    omit: IOmit;
    order: IOrder;
    pick: IPick;
    sort: boolean | ESort;
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
  public resetConfig(): this;
  /**
   * @name testConfig
   * @public
   * @static
   * @throws AggregateError
   * @param {Function|Object=} config
   * @returns {Object}
   * @since 1.6.0
   */
  public static testConfig(config: IConfig): IConfigObject;
  /**
   * @name config
   * @public
   * @throws AggregateError|TypeError
   * @param {Function|Object=} config
   * @returns {Vicis}
   */
  public config(config?: IConfig): this;
  /**
   * @name cast
   * @public
   * @throws TypeError
   * @param {Object=} propertyToType
   * @returns {Vicis}
   */
  public cast(propertyToType?: ICast): this;
  /**
   * @name defaults
   * @public
   * @throws TypeError
   * @param {Object=} propertyDefaultValues
   * @returns {Vicis}
   */
  public defaults(propertyDefaultValues?: IDefaults): this;
  /**
   * @name defined
   * @public
   * @throws TypeError
   * @param {Array.<string>=} propertiesMustBeDefined
   * @returns {Vicis}
   */
  public defined(propertiesMustBeDefined?: IDefined): this;
  /**
   * @name exclude
   * @public
   * @throws TypeError
   * @param {Array.<string|RegExp>=} propertiesToExclude
   * @returns {Vicis}
   */
  public exclude(propertiesToExclude?: IExclude): this;
  /**
   * @name omit
   * @public
   * @throws TypeError
   * @param {Array.<string>=} propertiesToOmit
   * @returns {Vicis}
   */
  public omit(propertiesToOmit?: IOmit): this;
  /**
   * @name order
   * @public
   * @throws TypeError
   * @param {Array.<string>=} propertiesToStreamline
   * @returns {Vicis}
   */
  public order(propertiesToStreamline?: IOrder): this;
  /**
   * @name pick
   * @public
   * @throws TypeError
   * @param {Array.<string>=} propertiesToPick
   * @returns {Vicis}
   */
  public pick(propertiesToPick?: IPick): this;
  /**
   * @name rename
   * @public
   * @throws TypeError
   * @param {Object=} renamePropertyFromTo
   * @returns {Vicis}
   */
  public rename(renamePropertyFromTo?: IRename): this;
  /**
   * @name replace
   * @public
   * @throws TypeError
   * @param {Object=} replacePropertyValues
   * @returns {Vicis}
   */
  public replace(replacePropertyValues?: IReplace): this;
  /**
   * @name required
   * @public
   * @throws TypeError
   * @param {Array.<string>=} propertiesRequired
   * @returns {Vicis}
   */
  public required(propertiesRequired?: IRequired): this;
  /**
   * @name sort
   * @public
   * @throws TypeError
   * @param {boolean=} sortProperties
   * @returns {Vicis}
   */
  public sort(sortProperties?: boolean | ESort): Vicis;
  /**
   * @name transform
   * @public
   * @throws TypeError
   * @param {Object=} propertyValueTransformWith
   * @returns {Vicis}
   */
  public transform(propertyValueTransformWith?: ITransform): Vicis;
  /**
   * @name getData
   * @public
   * @returns {Object}
   */
  public getData(): IObject;
  /**
   * @name data
   * @public
   * @throws TypeError
   * @param {Object} dataToSerialize
   * @returns {Vicis}
   */
  public data(dataToSerialize: IObject): Vicis;
  /**
   * @name clear
   * @description Clear any data references and cached values
   * @public
   * @returns {Vicis}
   */
  public clear(): Vicis;
  /**
   * @name toJSON
   * @public
   * @returns {Object}
   */
  public toJSON(): IObject;
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
  public fromArray(collection: IObject[]): IObject[];
}
