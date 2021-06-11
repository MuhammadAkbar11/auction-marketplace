const notFound = (req, res, next) => {
  const error = new Error(`Not Found = ${req.originalUrl}`);
  res.status(400);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  const isErrorsEmpty = obj => {
    if (obj === undefined) {
      return true;
    }
    return Object.keys(obj).length === 0;
  };

  const resErrorData = {
    status: false,
    statusCode: statusCode,
    message: err.message,
    errors: err.errors,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  };
  console.log(resErrorData);
  if (isErrorsEmpty(err.errors)) {
    delete resErrorData.errors;
  }

  res.status(statusCode).json(resErrorData);
};

export { notFound, errorHandler };
