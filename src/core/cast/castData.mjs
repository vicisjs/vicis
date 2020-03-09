import TYPES_ENUM from "../../const/typesEnum";
import isObjectEmpty from "../../util/check/isObjectEmpty";
import objectToPlain from "../../util/object/toPlain";
import toFlag from "../../util/to/flag";

/**
 * @name castData
 * @param {Object.<string, string>} propertyToType
 * @param {Object} dataToSerialize
 * @returns {Object}
 */
export default function castData(propertyToType, dataToSerialize) {
  if (isObjectEmpty(propertyToType)) {
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
        dataToSerialize[key] = toFlag(dataToSerialize[key]);
        break;
      case TYPES_ENUM.NUMERIC: {
        const castedNumber = Number(dataToSerialize[key]);
        if (Number.isFinite(castedNumber)) {
          dataToSerialize[key] = castedNumber;
        } else {
          const parsed = Number.parseFloat(toString(dataToSerialize[key]).trim());
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
          const parsed = Number.parseFloat(toString(dataToSerialize[key]).trim());
          if (Number.isFinite(parsed)) {
            dataToSerialize[key] = Math.trunc(castedInteger);
          } else {
            dataToSerialize[key] = 0;
          }
        }
        break;
      }
      case TYPES_ENUM.STRING:
        dataToSerialize[key] = toString(dataToSerialize[key]);
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
