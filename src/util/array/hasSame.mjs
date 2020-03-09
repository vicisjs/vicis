/**
 * @name arrayHasSame
 * @param {Array} alpha
 * @param {Array} beta
 * @returns {boolean}
 */
export default function arrayHasSame(alpha, beta) {
  if (!alpha.length || !beta.length) {
    return false;
  }
  const setB = new Set(beta);
  return [...new Set(alpha)].filter((x) => setB.has(x)).length > 0;
}
