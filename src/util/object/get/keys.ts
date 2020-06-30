/**
 * @name objectGetKeys
 * @param {Object} object
 * @returns {Array.<string>}
 */
export function objectGetKeys(object: { [key: string]: any }): string[] {
  return Object.keys(object).sort((alpha, beta) => alpha.localeCompare(beta));
}
