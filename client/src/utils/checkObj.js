export const checkProperties = obj => {
  for (let key in obj) {
    if (obj[key] !== null && obj[key] !== "") return true;
  }
  return false;
};

export const isEmptyObj = obj => {
  return !Object.values(obj).some(element => element === null);
};
