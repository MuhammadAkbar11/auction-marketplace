export const _dateFormat = (date, format) => {
  const d = new Date(date);
  let yyyy = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
  let mm = new Intl.DateTimeFormat("en", { month: "2-digit" }).format(d);
  let dd = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);

  let result = `${dd}/${mm}/${yyyy}`;
  if (format === "strip") {
    result = `${yyyy}-${mm}-${dd}`;
  }
  return result;
};
