/**
 * @param {Object} object
 * @returns {boolean}
 */
export function objectIsEmpty(object: { [key: string]: any }): boolean {
  return Object.keys(object).length === 0;
}
