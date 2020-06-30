/**
 * @name objectKeysOrder
 * @param {Object} instance
 * @param {Array.<string>} keys
 * @param {boolean=} alphabetize
 * @returns {Object}
 */
export function objectKeysOrder<T extends { [key: string]: any }>(
  instance: T,
  keys: string[] = [],
  alphabetize = false,
): T {
  if (!Array.isArray(keys) || keys.length === 0) {
    return instance;
  }
  // noinspection SuspiciousTypeOfGuard
  const orderKeys = keys.filter((key) => typeof key === "string");
  let objectKeys: string[] | Set<string> = new Set(Object.keys(instance));
  const newObject: { [key: string]: any } = {};
  orderKeys.forEach((key) => {
    (objectKeys as Set<string>).delete(key);
    if (key in instance) {
      newObject[key] = instance[key];
    }
  });
  objectKeys = [...objectKeys];
  if (alphabetize) {
    objectKeys = objectKeys.sort((alpha, beta) => alpha.localeCompare(beta));
  }
  objectKeys.forEach((key) => (newObject[key] = instance[key]));
  return newObject as T;
}
