// Design Pattern: Factory + Inheritance
// Principle: Open/Closed – Extendable error types

class CustomErrors extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default CustomError;
