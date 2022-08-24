export abstract class CustomError extends Error {
  abstract statusCode: number;
  abstract message: string;
  abstract serializeErrors(): {
    message: string;
    field?: string;
  }[];

  /**
   *
   */
  constructor(messege: string) {
    super(messege);

    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
