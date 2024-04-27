import WatchingFilterModel from '../models/filters/watchingFilter';

export const WATCHING_FILTER = 'watchingFilter';

const get = (name, defaultValue = null) =>
  localStorage.getItem(name) ?? defaultValue;
const set = (name, value) => localStorage.setItem(name, value);

const getObject = (name, defaultValue = null) => {
  const obj = get(name);
  if (!obj) return defaultValue;

  return JSON.parse(obj);
};
const setObject = (name, value) => set(name, JSON.stringify(value));

export const lsHelper = {
  getWatchingFilter: () =>
    getObject(WATCHING_FILTER, new WatchingFilterModel().getInitialState()),
  setWatchingFilter: (value) => setObject(WATCHING_FILTER, value),
};
