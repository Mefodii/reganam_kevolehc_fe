export const sortByKey = (key) => (a, b) => a[key] > b[key] ? 1 : -1;

export const isObject = (variable) => {
  return typeof variable === "object";
};

export const isObjEmpty = (obj) =>
  obj && // 👈 null and undefined check
  Object.keys(obj).length === 0 &&
  obj.constructor === Object;

export const getToday = () => {
  var today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const day = today.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};
