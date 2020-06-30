import { IObject } from "../../../interface/common/IObject";

/**
 * @name objectKeysSort
 * @param {object} instance
 * @param {boolean=true} isDeep
 * @returns {object}
 */
export function objectKeysSort<T extends { [key: string]: any }>(
  instance: T,
  isDeep = true,
): T {
  if (!instance || typeof instance !== "object" || Array.isArray(instance)) {
    return instance;
  }
  const keys = Object.keys(instance);
  if (!keys.length) {
    return instance;
  }
  return keys.reduce((sorted, key) => {
    if (
      isDeep && instance[key] && typeof instance[key] === "object" &&
      !Array.isArray(instance[key])
    ) {
      sorted[key] = objectKeysSort(instance[key], isDeep);
    } else {
      sorted[key] = instance[key];
    }
    return sorted;
  }, Object.create(Object.getPrototypeOf(instance)) as IObject) as T;
}
