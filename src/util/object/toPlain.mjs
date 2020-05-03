import objectDeserialize from "./deserialize";
import objectSerialize from "./serialize";

/**
 * @name objectToPlain
 * @param {object|string} value
 * @returns {*}
 */
export default function objectToPlain(value) {
  return objectDeserialize(objectSerialize(value));
}
