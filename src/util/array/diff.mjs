/**
 * @name arrayDiff
 * @param {Array} alpha
 * @param {Array} beta
 * @returns {Array}
 */
export default function arrayDiff(alpha, beta) {
  const set = new Set(beta);
  return alpha.filter((value) => !set.has(value));
}
