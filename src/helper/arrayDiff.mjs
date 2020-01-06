/**
 * @name arrayDiff
 * @param {*[]} alpha
 * @param {*[]} beta
 * @returns {*[]}
 */
export function arrayDiff(alpha, beta) {
  const set = new Set(beta);
  return alpha.filter((value) => !set.has(value));
}
