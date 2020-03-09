/**
 * @name objectKeys
 * @param {Object} object
 * @returns {Array.<string>}
 */
export default function objectKeys(object) {
  return Object.keys(object).sort((alpha, beta) => alpha.localeCompare(beta));
}
