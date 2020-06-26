import { IObject } from "../../../interface/common/IObject";

import { objectDeserialize } from "../deserialize";
import { objectSerialize } from "../serialize";

/**
 * @name objectToPlain
 * @param {object} value
 * @returns {object}
 */
function objectToPlain(value: IObject): IObject {
  return objectDeserialize(objectSerialize(value));
}

export { objectToPlain };
