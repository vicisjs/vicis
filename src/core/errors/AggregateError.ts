// import AggregateError from "es-aggregate-error";
// AggregateError.shim(); // will be a no-op if not needed

export class AggregateError extends Error {
  public readonly name = "AggregateError";
  public errors: Error[] = [];
  /**
   * @param {Array<Error>} errors
   * @param {String} message
   */
  public constructor(errors: Error[], message = "") {
    super(message);
    this.errors = errors;
    this.message = message;
  }
}
