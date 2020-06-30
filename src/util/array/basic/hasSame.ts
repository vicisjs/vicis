/**
 * @name arrayHasSame
 * @param {Array} alpha
 * @param {Array} beta
 * @returns {boolean}
 */
export function arrayHasSame(alpha: unknown[], beta: unknown[]): boolean {
  if (!alpha.length || !beta.length) {
    return false;
  }
  const setB = new Set(beta);
  return Boolean([...new Set(alpha)].filter((x) => setB.has(x)).length);
}
