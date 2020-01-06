/**
 * @name arrayIntersect
 * @param {*[]} alpha
 * @param {*[]} beta
 * @returns {*[]}
 */
export function arrayIntersect(alpha, beta) {
  if (!alpha.length || !beta.length) {
    return [];
  }
  const setB = new Set(beta);
  return [...new Set(alpha)].filter((x) => setB.has(x));
}
