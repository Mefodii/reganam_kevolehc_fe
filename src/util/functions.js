import { WATCHIO_STATUS_FINISHED } from "./constants";

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

export const getToday = () => {
  var today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const day = today.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const newArray = (length, defaultValue = null) =>
  [...Array(length).keys()].map((_) => defaultValue);

export const promptNumber = (text) => {
  const result = prompt(text);
  if (isNaN(result)) {
    alert(`${result} is not a number`);
    return undefined;
  }
  return parseInt(result);
};

export const isWatchioFinished = (status) => status === WATCHIO_STATUS_FINISHED;
