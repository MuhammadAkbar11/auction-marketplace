const transformErrorResponse = error => {
  let errData = {
    message: error.message,
  };
  if (error.response && error.response.data.message) {
    const errorData = error.response.data.errors && error.response.data.errors;
    errData = {
      message: error.response.data.message,
      ...errorData,
    };
  }

  return errData;
};

export { transformErrorResponse };
