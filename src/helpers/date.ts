const yyyymmdd = (date: string) => {
  return new Date(date).toLocaleDateString("fr-CA");
};

const mmddyyyy = (date: string) => {
  return new Date(date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

const mmyyyy = (date: string) => {
  return new Date(date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "2-digit",
  });
};

const mmddyy = (date: string) => {
  const dateObj = new Date(date);
  return `${(dateObj.getMonth() + 1).toString().padStart(2, "0")}/${dateObj
    .getDate()
    .toString()
    .padStart(2, "0")}/${dateObj.getFullYear().toString().slice(2, 4)}`;
};

const yyyy_mm_dd = (date: string) => {
  const dateObj = new Date(date);
  return `${dateObj.getFullYear()}-${(dateObj.getMonth() + 1).toString().padStart(2, "0")}-${(
    dateObj.getDate() + 1
  )
    .toString()
    .padStart(2, "0")}`;
};

const formatDate = {
  yyyymmdd,
  mmddyyyy,
  mmyyyy,
  mmddyy,
  yyyy_mm_dd,
};

export default formatDate;
