import { watchingFilter } from '../models';

enum LSObject {
  WATCHING_FILTER = 'watchingFilter',
}

const get = (name: LSObject, defaultValue = null) =>
  localStorage.getItem(name) ?? defaultValue;
const set = (name: LSObject, value: string) =>
  localStorage.setItem(name, value);

const getObject = <T>(name: LSObject, defaultValue: T): T => {
  const obj = get(name);
  if (!obj) return defaultValue;

  return JSON.parse(obj);
};
const setObject = <T>(name: LSObject, value: T) =>
  set(name, JSON.stringify(value));

export const lsHelper = {
  getWatchingFilter: (): Model.WatchingFilter =>
    getObject(LSObject.WATCHING_FILTER, watchingFilter.getInitialState()),
  setWatchingFilter: (value: Model.WatchingFilter) =>
    setObject(LSObject.WATCHING_FILTER, value),
};
