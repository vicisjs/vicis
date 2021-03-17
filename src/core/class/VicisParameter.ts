import { IFunction } from "../../interface/common/IFunction";

import { ECastType } from "../../const/ECastType";

export class VicisParameter {
  __cast?: string;
  __defaults?: any;
  __defined?: boolean;
  __hasDefaults = false;
  __hasNullish = false;
  __hasValue = false;
  __nullish?: any;
  __required?: boolean;
  __transform?: IFunction;
  __value = undefined;
  get boolean(): VicisParameter {
    this.__cast = ECastType.BOOLEAN;
    return this;
  }
  get flag(): VicisParameter {
    this.__cast = ECastType.FLAG;
    return this;
  }
  get integer(): VicisParameter {
    this.__cast = ECastType.INTEGER;
    return this;
  }
  get numeric(): VicisParameter {
    this.__cast = ECastType.NUMERIC;
    return this;
  }
  get string(): VicisParameter {
    this.__cast = ECastType.STRING;
    return this;
  }
  get json(): VicisParameter {
    this.__cast = ECastType.JSON;
    return this;
  }
  get defined(): VicisParameter {
    this.__defined = true;
    return this;
  }
  get required(): VicisParameter {
    this.__required = true;
    return this;
  }
  replace(value: any): VicisParameter {
    this.__value = value;
    this.__hasValue = true;
    return this;
  }
  defaults(value: any): VicisParameter {
    this.__defaults = value;
    this.__hasDefaults = true;
    return this;
  }
  nullish(value: any): VicisParameter {
    this.__nullish = value;
    this.__hasNullish = true;
    return this;
  }
  transform(callable: IFunction): VicisParameter {
    this.__transform = callable;
    return this;
  }
  toObject(): {
    cast: string | undefined;
    defaults: any;
    defined: boolean | undefined;
    hasDefaults: boolean;
    hasNullish: boolean;
    hasValue: boolean;
    nullish: any;
    required: boolean | undefined;
    transform: ((...args: unknown[]) => unknown) | undefined;
    value: any;
  } {
    return {
      cast: this.__cast,
      defaults: this.__defaults,
      defined: this.__defined,
      hasDefaults: this.__hasDefaults,
      hasNullish: this.__hasNullish,
      hasValue: this.__hasValue,
      nullish: this.__nullish,
      required: this.__required,
      transform: this.__transform,
      value: this.__value,
    };
  }
}
