export const onlyNumbers = value => {
  return value
    ? // ? value
      //     .trim()
      //     .split(/[^0-9/]/g)
      //     .join("")
      value.replace(/\D/g, "")
    : 0;
};

export const removeDuplicateId = (arr, id) => {
  const seen = new Set();

  return arr.filter(el => {
    const duplicate = seen.has(el[id]);
    seen.add(el[id]);
    return !duplicate;
  });
};
