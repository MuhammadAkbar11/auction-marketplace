function isEmptyObj(obj) {
  return !Object.values(obj).some(element => element === null);
}

export { isEmptyObj };
