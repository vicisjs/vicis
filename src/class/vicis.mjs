import VicisData from "./data.mjs";
//
export default class Vicis extends VicisData {
  /**
   * @name factory
   * @public
   * @static
   * @factory
   * @param {Object=} config
   * @returns {Vicis}
   */
  static factory(config = {}) {
    return new Vicis(config);
  }
  /**
   * @name constructor
   * @public
   * @constructor
   * @param {Object=} config
   */
  constructor(config = {}) {
    super(config);
  }
  /**
   * @name valueOf
   * @public
   * @returns {{}}
   */
  valueOf() {
    return { ...this.cache };
  }
  /**
   * @name toJSON
   * @public
   * @returns {{}}
   */
  toJSON() {
    return { ...this.cache };
  }
  /**
   * @name toString
   * @public
   * @returns {String}
   */
  toString() {
    return JSON.stringify(this.cache);
  }
}
