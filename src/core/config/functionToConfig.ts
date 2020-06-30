import { IConfigObject } from "../../interface/config/IConfigObject";
import { IConfigObjectFull } from "../../interface/config/IConfigObjectFull";

import { IFunction } from "../../interface/common/IFunction";
import { IObject } from "../../interface/common/IObject";

import { createConfig } from "./createConfig";

import { isFunction } from "../../util/is/function";

import { VicisParameter } from "../class/VicisParameter";

export function convertFunctionToConfig(
  callable: IFunction,
): IConfigObjectFull {
  if (!isFunction(callable)) {
    throw new TypeError("Callable must be a function");
  }
  const model = callable(
    new Proxy(new Object(null), {
      get: function (targetObject: IObject, key: string) {
        if (!(key in targetObject)) {
          targetObject[key] = new VicisParameter();
        }
        return targetObject[key];
      },
    }),
  ) as IConfigObjectFull;
  const config: IConfigObjectFull = createConfig();
  Object.keys(model).forEach((keyOfConfig: string) => {
    const key = keyOfConfig as keyof IConfigObject;
    config.pick.push(key);
    const data: IObject = {};
    if (model[key] instanceof VicisParameter) {
      data[key] = ((model[key] as unknown) as VicisParameter).toObject();
    } else {
      const param = new VicisParameter();
      param.replace(model[key]);
      data[key] = param.toObject();
    }
    delete model[key];
    if (data[key].cast) {
      config.cast[key] = data[key].cast;
    }
    if (data[key].defined) {
      config.defined.push(key);
    }
    if (data[key].required) {
      config.required.push(key);
    }
    if (data[key].transform) {
      config.transform[key] = data[key].transform;
    }
    if (data[key].hasDefaults) {
      config.defaults[key] = data[key].defaults;
    }
    if (data[key].hasValue) {
      config.replace[key] = data[key].value;
    }
  });
  if (!Object.keys(config.cast).length) {
    delete config.cast;
  }
  if (!Object.keys(config.defaults).length) {
    delete config.defaults;
  }
  if (!config.defined.length) {
    delete config.defined;
  }
  if (!config.pick.length) {
    delete config.pick;
  }
  if (!config.required.length) {
    delete config.required;
  }
  if (!Object.keys(config.replace).length) {
    delete config.replace;
  }
  if (!Object.keys(config.transform).length) {
    delete config.transform;
  }
  return config;
}
