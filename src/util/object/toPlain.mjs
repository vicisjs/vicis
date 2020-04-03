import objectDeserialize from "./deserialize.mjs";
import objectSerialize from "./serialize.mjs";

/**
 * @name objectToPlain
 * @param {object|string} value
 * @returns {*}
 */
export default function objectToPlain(value) {
  return objectDeserialize(objectSerialize(value));
}
