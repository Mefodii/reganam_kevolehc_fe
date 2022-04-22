export const sortByKey = (key) => (a, b) => a[key] > b[key] ? 1 : -1;

export const isObject = (variable) => {
  return typeof variable === "object";
};

export const isObjEmpty = (obj) =>
  obj && // 👈 null and undefined check
  Object.keys(obj).length === 0 &&
  obj.constructor === Object;
