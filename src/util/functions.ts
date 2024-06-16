import { APIStatus } from './constants';

/**
 * Compare 2 objects by given key
 * @param  {String} key key value
 * @param  {Object} options  { caseSensitive : boolean (defeault: true)}
 */
export const compareByKey =
  (key: string, options?: { caseSensitive?: boolean }) =>
  <T, V>(a: T, b: V) => {
    const { caseSensitive = true } = options || {};
    var valueA: any = a[key as keyof T];
    var valueB: any = b[key as keyof V];

    if (!caseSensitive) {
      valueA = valueA.toUpperCase();
      valueB = valueB.toUpperCase();
    }

    return valueA > valueB ? 1 : -1;
  };

export const newArray = (length: number, defaultValue = null) =>
  [...Array(length).keys()].map((_) => defaultValue);

export const promptNumber = (text: string) => {
  const result = prompt(text);
  if (result === null || isNaN(Number(result))) {
    alert(`${result} is not a number`);
    return undefined;
  }
  return parseInt(result);
};

export const splitByNewline = (value: string) => value.split(/\r?\n/);
export const joinByNewline = (lines: string[], linebreak = '\n') =>
  lines.join(linebreak);

export const saveToClipboard = (text: string) =>
  navigator.clipboard.writeText(text);
export const getTextFromClipboard = () => navigator.clipboard.readText();

export const isAPIStatusRequestDone = (apiStatus: APIStatus) =>
  [APIStatus.OK, APIStatus.NOT_OK].includes(apiStatus);

export const validateMandatoryFields = <T>(
  obj: T,
  fields: string[]
): [boolean, Partial<T>] => {
  let error: Partial<T> = {};
  let isValid = true;
  fields.forEach((field) => {
    if (obj[field as keyof typeof obj] === undefined) {
      error = { ...error, [field]: 'Value is mandatory' };
      isValid = false;
    }
  });

  return [isValid, error];
};

export const filterSelectedItems = <T>(items: T[], indexes: number[]): T[] =>
  items.filter((_, i) => indexes.includes(i));
