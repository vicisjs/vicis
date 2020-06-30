import { IObject } from "../common/IObject";

export interface IConfigCallback {
  (model: IObject): IObject;
}
