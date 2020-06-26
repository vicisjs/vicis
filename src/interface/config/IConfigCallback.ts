import { IObject } from "../common/IObject";

interface IConfigCallback {
  (model: IObject): IObject;
}

export { IConfigCallback };
