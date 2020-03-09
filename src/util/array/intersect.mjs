/**
 * @name arrayIntersect
 * @param {Array} alpha
 * @param {Array} beta
 * @returns {Array}
 */
export default function arrayIntersect(alpha, beta) {
  if (!alpha.length || !beta.length) {
    return [];
  }
  const setB = new Set(beta);
  return [...new Set(alpha)].filter((x) => setB.has(x));
}
