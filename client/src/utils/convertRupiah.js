const convertRupiah = value => {
  let toRupiah = value
    .toLocaleString("id", {
      style: "currency",
      currency: "IDR",
    })
    .split(",")[0];

  const filterNum = toRupiah.replace(/[^\d.,]/g, "");
  return filterNum;
};

export default convertRupiah;
