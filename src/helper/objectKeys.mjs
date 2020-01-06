/**
 * @name objectKeys
 * @param {Object} object
 * @returns {string[]}
 */
export function objectKeys(object) {
  return Object.keys(object).sort((alpha, beta) => alpha.localeCompare(beta));
}
