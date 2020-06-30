import { IObject } from "../common/IObject";

export interface ITransform {
  [key: string]: (value: unknown, key: string, data: IObject) => unknown;
}
