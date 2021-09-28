export interface TransformFunctionInterface {
  (value: unknown, key: string, data: Record<string, any>): unknown;
}

export interface ConfigTransformInterface {
  [key: string]: TransformFunctionInterface;
}

/**
 * @deprecated
 */
export interface ITransform {
  [key: string]: TransformFunctionInterface;
}