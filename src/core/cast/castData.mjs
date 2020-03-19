import castToString from "@corefunc/corefunc/cast/to/string.mjs";
import convertToFlag from "@corefunc/corefunc/convert/to/flag.mjs";
import objectIsEmpty from "@corefunc/corefunc/object/is/empty.mjs";

import TYPES_ENUM from "../../const/typesEnum";

import objectToPlain from "../../util/object/toPlain";

/**
 * @name castData
 * @param {Object.<string, string>} propertyToType
 * @param {Object} dataToSerialize
 * @returns {Object}
 */
export default function castData(propertyToType, dataToSerialize) {
  if (objectIsEmpty(propertyToType)) {
    return dataToSerialize;
  }
  Object.keys(propertyToType).forEach((key) => {
    const castTo = propertyToType[key];
    if (!(key in dataToSerialize)) {
      throw new Error(`Field '${key}' suppose to be converted to ${castTo}.`);
    }
    switch (castTo) {
      case TYPES_ENUM.BOOLEAN:
        dataToSerialize[key] = Boolean(dataToSerialize[key]);
        break;
      case TYPES_ENUM.FLAG:
        dataToSerialize[key] = convertToFlag(dataToSerialize[key]);
        break;
      case TYPES_ENUM.NUMERIC: {
        const castedNumber = Number(dataToSerialize[key]);
        if (Number.isFinite(castedNumber)) {
          dataToSerialize[key] = castedNumber;
        } else {
          const parsed = Number.parseFloat(castToString(dataToSerialize[key]).trim());
          if (Number.isFinite(parsed)) {
            dataToSerialize[key] = parsed;
          } else {
            dataToSerialize[key] = 0;
          }
        }
        break;
      }
      case TYPES_ENUM.INTEGER: {
        const castedInteger = Number(dataToSerialize[key]);
        if (Number.isFinite(castedInteger)) {
          dataToSerialize[key] = Math.trunc(castedInteger);
        } else {
          const parsed = Number.parseFloat(castToString(dataToSerialize[key]).trim());
          if (Number.isFinite(parsed)) {
            dataToSerialize[key] = Math.trunc(castedInteger);
          } else {
            dataToSerialize[key] = 0;
          }
        }
        break;
      }
      case TYPES_ENUM.STRING:
        dataToSerialize[key] = castToString(dataToSerialize[key]);
        break;
      case TYPES_ENUM.JSON:
        dataToSerialize[key] = objectToPlain(dataToSerialize[key]);
        break;
      default:
        throw new Error("Unknown value convert error");
    }
  });
  return dataToSerialize;
}
