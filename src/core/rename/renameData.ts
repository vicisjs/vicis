import { IObject } from "../../interface/common/IObject";
import { IRename } from "../../interface/config/IRename";

import { cloneDeep } from "../../util/variable/cloneDeep";
import { objectIsEmpty } from "../../util/object/is/empty";

/**
 * @name renameData
 * @param {Object.<string, string>} renamePropertyFromTo
 * @param {Object} dataToSerialize
 * @returns {Object}
 */
export function renameData(
  renamePropertyFromTo: IRename,
  dataToSerialize: IObject,
): IObject {
  if (objectIsEmpty(renamePropertyFromTo)) {
    return dataToSerialize;
  }
  const renameFrom = Object.keys(renamePropertyFromTo).sort((alpha, beta) =>
    alpha.localeCompare(beta)
  );
  const renamedData: IObject = {};
  const data = cloneDeep(dataToSerialize);
  renameFrom.forEach((key) => {
    if (!(key in data)) {
      throw new Error(`Field '${key}' suppose to be renamed.`);
    }
    renamedData[renamePropertyFromTo[key]] = data[key];
  });
  renameFrom.forEach((key) => {
    delete data[key];
  });
  Object.assign(data, renamedData);
  return data;
}
