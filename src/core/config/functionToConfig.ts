import { IConfigObject } from "../../interface/config/IConfigObject";
import { IConfigObjectFull } from "../../interface/config/IConfigObjectFull";

import { IFunction } from "../../interface/common/IFunction";
import { IObject } from "../../interface/common/IObject";

import { createConfig } from "./createConfig";

import { isFunction } from "../../util/is/function";

import { VicisParameter } from "../class/VicisParameter";
import { IPick } from "../../interface/config/IPick";
import { IDefined } from "../../interface/config/IDefined";
import { ICast } from "../../interface/config/ICast";
import { IRequired } from "../../interface/config/IRequired";
import { ITransform } from "../../interface/config/ITransform";
import { IDefaults } from "../../interface/config/IDefaults";
import { IReplace } from "../../interface/config/IReplace";

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
    (config.pick as IPick).push(key);
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
      (config.cast as ICast)[key] = data[key].cast;
    }
    if (data[key].defined) {
      (config.defined as IDefined).push(key);
    }
    if (data[key].required) {
      (config.required as IRequired).push(key);
    }
    if (data[key].transform) {
      (config.transform as ITransform)[key] = data[key].transform;
    }
    if (data[key].hasDefaults) {
      (config.defaults as IDefaults)[key] = data[key].defaults;
    }
    if (data[key].hasValue) {
      (config.replace as IReplace)[key] = data[key].value;
    }
  });
  if (!Object.keys(config.cast as ICast).length) {
    delete config.cast;
  }
  if (!Object.keys(config.defaults as IDefaults).length) {
    delete config.defaults;
  }
  if (!(config.defined as IDefined).length) {
    delete config.defined;
  }
  if (!(config.pick as IPick).length) {
    delete config.pick;
  }
  if (!(config.required as IRequired).length) {
    delete config.required;
  }
  if (!Object.keys(config.replace as IReplace).length) {
    delete config.replace;
  }
  if (!Object.keys(config.transform as ITransform).length) {
    delete config.transform;
  }
  return config;
}
