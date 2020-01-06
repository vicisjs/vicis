/**
 * @name arrayHasSame
 * @param {*[]} alpha
 * @param {*[]} beta
 * @returns {boolean}
 */
export function arrayHasSame(alpha, beta) {
  if (!alpha.length || !beta.length) {
    return false;
  }
  const setB = new Set(beta);
  return !![...new Set(alpha)].filter((x) => setB.has(x)).length;
}
