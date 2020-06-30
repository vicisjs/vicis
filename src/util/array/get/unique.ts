/**
 * @name arrayGetUnique
 * @param {Array} array
 * @param {boolean=} sort
 * @returns {Array}
 * @example
 * arrayGetUnique([NaN, NaN, 0, -0, +0, "\u0065\u0301", "\u00e9"]) -> [ NaN, 0, 'é', -0 ]
 */
export function arrayGetUnique(array: any[], sort = true): any[] {
  if (array.length < 2) {
    return array;
  }
  let unique = [...new Set(array)];
  if (unique.includes(0)) {
    const zeroes = array.filter((value) => value === 0);
    if (
      zeroes.length > 1 &&
      zeroes.some((value) => 1 / value === Number.NEGATIVE_INFINITY)
    ) {
      unique.push(-0);
    }
  }
  if (unique.filter((value) => typeof value === "string").length) {
    const strings = array.filter((value) => typeof value === "string");
    if (strings.length > 1) {
      const normalized = [
        ...new Set(strings.map((value) => value.normalize())),
      ];
      normalized.forEach((value) => {
        delete unique[unique.indexOf(value)];
      });
      const compacted = [];
      for (let index = 0; index < unique.length; index++) {
        if (index in unique) {
          compacted.push(unique[index]);
        }
      }
      unique = compacted.concat(normalized);
    }
  }
  if (sort) {
    return unique.sort();
  }
  return unique;
}
