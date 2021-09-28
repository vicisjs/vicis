import { ECastType } from "./ECastType";

export const CAST_TYPE: {
  BOOLEAN: string;
  FLAG: string;
  INTEGER: string;
  JSON: string;
  NUMERIC: string;
  STRING: string;
} = {
  BOOLEAN: ECastType.BOOLEAN,
  FLAG: ECastType.FLAG,
  INTEGER: ECastType.INTEGER,
  JSON: ECastType.JSON,
  NUMERIC: ECastType.NUMERIC,
  STRING: ECastType.STRING,
};

export type CastType = typeof CAST_TYPE[keyof typeof CAST_TYPE];