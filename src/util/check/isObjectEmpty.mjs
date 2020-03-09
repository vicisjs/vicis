/**
 * name isObjectEmpty
 * @param {Object} object
 * @returns {boolean}
 */
export default function isObjectEmpty(object) {
  return Object.keys(object).length === 0;
}
