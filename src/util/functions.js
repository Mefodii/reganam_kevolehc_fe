/**
 * Compare 2 objects by given key
 * @param  {String} key key value
 * @param  {Object} options  { caseSensitive : boolean (defeault: true)}
 */
export const compareByKey = (key, options) => (a, b) => {
  const { caseSensitive = true } = options || {};
  var valueA = a[key];
  var valueB = b[key];

  if (!caseSensitive) {
    valueA = valueA.toUpperCase();
    valueB = valueB.toUpperCase();
  }

  return valueA > valueB ? 1 : -1;
};

export const objectEqualsSimple = (o1, o2) =>
  JSON.stringify(o1) === JSON.stringify(o2);

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

export const initArray = (length, defaultValue = null) =>
  [...Array(length).keys()].map((_) => defaultValue);
