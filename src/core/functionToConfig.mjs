import isFunction from "@corefunc/corefunc/is/function";

import VicisParameter from "./parameter";

export default function convertFunctionToConfig(callable) {
  if (!isFunction(callable)) {
    throw new TypeError("Callable must be a function");
  }
  const model = callable(
    new Proxy(new Object(null), {
      get: function (targetObject, propName) {
        if (!(propName in targetObject)) {
          targetObject[propName] = new VicisParameter();
        }
        return targetObject[propName];
      },
    }),
  );
  const config = {
    cast: {},
    defaults: {},
    defined: [],
    pick: [],
    required: [],
    replace: {},
    transform: {},
  };
  Object.keys(model).forEach((key) => {
    config.pick.push(key);
    const data = {};
    if (model[key] instanceof VicisParameter) {
      data[key] = model[key].toObject();
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
