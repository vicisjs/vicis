/**
 * @name objectGetKeys
 * @param {Object} object
 * @returns {Array.<string>}
 */
function objectGetKeys(object: { [key: string]: any }): string[] {
  return Object.keys(object).sort((alpha, beta) => alpha.localeCompare(beta));
}

export { objectGetKeys };
