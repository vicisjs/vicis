import { IConfigCallback } from "./IConfigCallback";
import { IConfigObject } from "./IConfigObject";

/**
 * @deprecated
 */
export type IConfig = IConfigObject | IConfigCallback;

export type ConfigInterface = IConfigObject | IConfigCallback;
