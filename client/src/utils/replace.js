export const onlyNumbers = value => {
  // return value ? value.replace(/[^\d]/g, "") : 0;
  return value
    ? // ? value
      //     .trim()
      //     .split(/[^0-9/]/g)
      //     .join("")
      value.replace(/\D/g, "")
    : 0;
};
