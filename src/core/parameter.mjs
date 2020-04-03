import TYPES_ENUM from "../const/typesEnum.mjs";

export default class VicisParameter {
  #cast = undefined;
  #defaults = undefined;
  #defined = undefined;
  #hasDefaults = false;
  #hasValue = false;
  #required = undefined;
  #transform = undefined;
  #value = undefined;
  get boolean() {
    this.#cast = TYPES_ENUM.BOOLEAN;
    return this;
  }
  get flag() {
    this.#cast = TYPES_ENUM.FLAG;
    return this;
  }
  get integer() {
    this.#cast = TYPES_ENUM.INTEGER;
    return this;
  }
  get numeric() {
    this.#cast = TYPES_ENUM.NUMERIC;
    return this;
  }
  get string() {
    this.#cast = TYPES_ENUM.STRING;
    return this;
  }
  get json() {
    this.#cast = TYPES_ENUM.JSON;
    return this;
  }
  get defined() {
    this.#defined = true;
    return this;
  }
  get required() {
    this.#required = true;
    return this;
  }
  replace(value) {
    this.#value = value;
    this.#hasValue = true;
    return this;
  }
  default(value) {
    this.#defaults = value;
    this.#hasDefaults = true;
    return this;
  }
  transform(callable) {
    this.#transform = callable;
    return this;
  }
  toObject() {
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
