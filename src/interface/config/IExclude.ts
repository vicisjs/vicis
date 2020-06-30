export interface IExclude extends Array<string | RegExp> {
  [index: number]: string | RegExp;
}
