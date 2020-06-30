import { IObject } from "../../interface/common/IObject";
import { IRename } from "../../interface/config/IRename";

import { objectIsEmpty } from "../../util/object/is/empty";

import { renameConfig } from "./renameConfig";
import { renameData } from "./renameData";

/**
 * @name rename
 * @param {Object} data
 * @param {Object.<string, string>=} renamePropertyFromTo
 * @returns {Object}
 */
export function rename(
  data: IObject,
  renamePropertyFromTo: IRename = {},
): IObject {
  const config = renameConfig(renamePropertyFromTo);
  if (objectIsEmpty(config)) {
    return data;
  }
  return renameData(config, data);
}
