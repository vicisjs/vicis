/**
 * @param {Object} object
 * @returns {boolean}
 */
function objectIsEmpty(object: { [key: string]: any }): boolean {
  return Object.keys(object).length === 0;
}

export { objectIsEmpty };
