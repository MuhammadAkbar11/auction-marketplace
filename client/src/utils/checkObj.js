export const checkProperties = obj => {
  for (let key in obj) {
    if (obj[key] !== null && obj[key] !== "") return true;
  }
  return false;
};

export const isEmptyObj = obj => {
  return !Object.values(obj).some(element => element === null);
};

export const convertYupErrorsToObject = array => {
  return array
    .map(item => ({
      path: item.path,
      type: item.type,
      message: item.message,
    }))
    .reduce((acc, curr) => {
      console.log(acc, curr);
      acc[curr["path"]] = curr.message;
      return acc;
    }, {});
};
