/**
 *
 * @returns today date in format YYYY-MM-DD
 */
export const getToday = (): string => {
  var today = new Date();
  return getYMD(today);
};

export const getNow = (): string => {
  var now = new Date();
  return `${getYMD(now)}T${getHMS(now)}Z`;
};

export const toLocalDatetime = (datetime?: string) => {
  if (!datetime) return datetime;
  const date = new Date(datetime);
  return `${getYMD(date, false)} ${getHMS(date, false)}`;
};

const getYMD = (date: Date, utc: boolean = true): string => {
  const year = utc ? date.getUTCFullYear() : date.getFullYear();
  const month = ((utc ? date.getUTCMonth() : date.getMonth()) + 1)
    .toString()
    .padStart(2, '0');
  const day = (utc ? date.getUTCDate() : date.getDate())
    .toString()
    .padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const getHMS = (date: Date, utc: boolean = true): string => {
  const hours = (utc ? date.getUTCHours() : date.getHours())
    .toString()
    .padStart(2, '0');
  const minutes = (utc ? date.getUTCMinutes() : date.getMinutes())
    .toString()
    .padStart(2, '0');
  const seconds = (utc ? date.getUTCSeconds() : date.getSeconds())
    .toString()
    .padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
};
