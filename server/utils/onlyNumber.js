const onlyNumbers = value => {
  return value ? value.replace(/\D/g, "") : 0;
};

export default onlyNumbers;
