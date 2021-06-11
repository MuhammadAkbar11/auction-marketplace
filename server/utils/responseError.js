function ResponseError(statusCode, message, errors = {}) {
  this.statusCode = statusCode;
  this.message = message;
  this.errors = { ...errors };
  this.message = message || "Something went wrong";
  this.stack = new Error().stack;
}

ResponseError.prototype = Object.create(Error.prototype);
ResponseError.prototype.constructor = ResponseError;

export default ResponseError;
