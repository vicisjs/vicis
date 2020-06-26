import { IObject } from "../common/IObject";

interface ITransform {
  [key: string]: (value: unknown, key: string, data: IObject) => unknown;
}

export { ITransform };
