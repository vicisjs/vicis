import { IFunction } from "../../interface/common/IFunction";

import { ECastType } from "../../const/ECastType";

export class VicisParameter {
  #cast?: string;
  #defaults?: any;
  #defined?: boolean;
  #hasDefaults = false;
  #hasValue = false;
  #required?: boolean;
  #transform?: IFunction;
  #value = undefined;
  get boolean(): VicisParameter {
    this.#cast = ECastType.BOOLEAN;
    return this;
  }
  get flag(): VicisParameter {
    this.#cast = ECastType.FLAG;
    return this;
  }
  get integer(): VicisParameter {
    this.#cast = ECastType.INTEGER;
    return this;
  }
  get numeric(): VicisParameter {
    this.#cast = ECastType.NUMERIC;
    return this;
  }
  get string(): VicisParameter {
    this.#cast = ECastType.STRING;
    return this;
  }
  get json(): VicisParameter {
    this.#cast = ECastType.JSON;
    return this;
  }
  get defined(): VicisParameter {
    this.#defined = true;
    return this;
  }
  get required(): VicisParameter {
    this.#required = true;
    return this;
  }
  replace(value: any): VicisParameter {
    this.#value = value;
    this.#hasValue = true;
    return this;
  }
  defaults(value: any): VicisParameter {
    this.#defaults = value;
    this.#hasDefaults = true;
    return this;
  }
  transform(callable: IFunction): VicisParameter {
    this.#transform = callable;
    return this;
  }
  toObject(): {
    cast: string | undefined;
    transform: ((...args: unknown[]) => unknown) | undefined;
    defaults: any;
    hasDefaults: boolean;
    hasValue: boolean;
    value: any;
    defined: boolean | undefined;
    required: boolean | undefined;
  } {
    return {
      cast: this.#cast,
      defaults: this.#defaults,
      defined: this.#defined,
      hasDefaults: this.#hasDefaults,
      hasValue: this.#hasValue,
      required: this.#required,
      transform: this.#transform,
      value: this.#value,
    };
  }
}
