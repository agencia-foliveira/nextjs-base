export enum ErrorCodes {
  NotFound = 404,
  Unauthorized = 401,
  Forbidden = 403,
  InternalServerError = 500,
}

export class CustomError extends Error {
  public code: ErrorCodes;

  constructor(message: string, code?: ErrorCodes) {
    super(message);
    this.name = 'CustomError';
    this.code = code || ErrorCodes.InternalServerError;
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
