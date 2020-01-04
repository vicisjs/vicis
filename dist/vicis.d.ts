export enum TYPES_ENUM {
  BOOLEAN = "boolean",
  NUMERIC = "numeric",
  INTEGER = "integer",
  STRING = "string",
  JSON = "json",
}

export interface IVicisOptions {
  cast: { [prop: string]: TYPES_ENUM };
  default: { [prop: string]: any };
  defined: string[];
  omit: string[];
  pick: string[];
  sort: boolean;
  rename: { [prop: string]: string };
  replace: { [prop: string]: any };
  required: string[];
  transform: { [prop: string]: Function };
}

export declare class Vicis {
  /**
   * @name constructor
   * @public
   * @constructor
   * @param {object=} config
   * @param {object=} data
   */
  public constructor(config: IVicisOptions, data: object);
}
