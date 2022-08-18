import { CustomError } from "./custom-error";
import { ValidationError } from "express-validator";

export class RequestValidationError extends CustomError {
  message: string = "Request Validation Error";
  statusCode = 400;
  // public errors: ValidationError[];

  constructor(public errors: ValidationError[]) {
    super("Invalid request parameters");

    // this.errors=errors;
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((error) => {
      return {
        message: error.msg,
        field: error.param,
      };
    });
  }
}
