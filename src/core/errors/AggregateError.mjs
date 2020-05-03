import AggregateError from "es-aggregate-error";
AggregateError.shim(); // will be a no-op if not needed

export { AggregateError };
