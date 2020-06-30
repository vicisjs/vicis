import { ICast } from "../../interface/config/ICast";
import { IObject } from "../../interface/common/IObject";

import { castToString } from "../../util/cast/to/string";
import { convertToFlag } from "../../util/convert/to/flag";
import { objectIsEmpty } from "../../util/object/is/empty";
import { objectToPlain } from "../../util/object/to/plain";
import { ECastType } from "../../const/ECastType";

/**
 * @name castData
 * @param {Object.<string, string>} propertyToType
 * @param {Object} dataToSerialize
 * @returns {Object}
 */
export function castData(
  propertyToType: ICast,
  dataToSerialize: IObject,
): IObject {
  if (objectIsEmpty(propertyToType)) {
    return dataToSerialize;
  }
  Object.keys(propertyToType).forEach((key) => {
    const castTo = propertyToType[key] as any;
    if (!(key in dataToSerialize)) {
      throw new Error(`Field '${key}' suppose to be converted to ${castTo}.`);
    }
    switch (castTo) {
      case ECastType.BOOLEAN:
        dataToSerialize[key] = Boolean(dataToSerialize[key]);
        break;
      case ECastType.FLAG:
        dataToSerialize[key] = convertToFlag(dataToSerialize[key]);
        break;
      case ECastType.NUMERIC: {
        const castedNumber = Number(dataToSerialize[key]);
        if (Number.isFinite(castedNumber)) {
          dataToSerialize[key] = castedNumber;
        } else {
          const parsed = Number.parseFloat(
            castToString(dataToSerialize[key]).trim(),
          );
          if (Number.isFinite(parsed)) {
            dataToSerialize[key] = parsed;
          } else {
            dataToSerialize[key] = 0;
          }
        }
        break;
      }
      case ECastType.INTEGER: {
        const castedInteger = Number(dataToSerialize[key]);
        if (Number.isFinite(castedInteger)) {
          dataToSerialize[key] = Math.trunc(castedInteger);
        } else {
          const parsed = Number.parseFloat(
            castToString(dataToSerialize[key]).trim(),
          );
          if (Number.isFinite(parsed)) {
            dataToSerialize[key] = Math.trunc(castedInteger);
          } else {
            dataToSerialize[key] = 0;
          }
        }
        break;
      }
      case ECastType.STRING:
        dataToSerialize[key] = castToString(dataToSerialize[key]);
        break;
      case ECastType.JSON:
        dataToSerialize[key] = objectToPlain(dataToSerialize[key] as any);
        break;
      default:
        throw new Error("Unknown value convert error");
    }
  });
  return dataToSerialize;
}
