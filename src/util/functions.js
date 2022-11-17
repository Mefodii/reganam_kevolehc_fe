import {
  WATCHIO_STATUS_FINISHED,
  WATCHIO_STATUS_PLANNED,
  WATCHIO_STATUS_WATCHING,
} from "./constants";

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
export const isWatchioQueue = (status) =>
  status === WATCHIO_STATUS_PLANNED || status === WATCHIO_STATUS_WATCHING;

export const filterComponentProps = (componentPropTypes, props) => {
  const keys = Object.keys(componentPropTypes);

  let newProps = {};
  keys.forEach((key) => {
    if (props[key] !== undefined) newProps[key] = props[key];
  });

  return newProps;
};

export const saveToClipboard = (text) => navigator.clipboard.writeText(text);
export const getTextFromClipboard = () => navigator.clipboard.readText();
