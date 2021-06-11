const errMessageValidation = (errors = []) => {
  let errorObj = {};
  const newArrError = [...errors];
  for (var i = 0, len = newArrError.length; i < len; i++) {
    const messageArr = errors
      .filter(item => item.param == newArrError[i]["param"])
      .map(el => el.msg);
    errorObj[newArrError[i]["param"]] = {
      type: newArrError[i]["param"],
      message: messageArr,
    };
  }

  for (var key in errorObj) newArrError.push(errorObj[key]);

  return errorObj;
};

export default errMessageValidation;
