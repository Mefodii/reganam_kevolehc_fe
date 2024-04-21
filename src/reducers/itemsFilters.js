import { UPDATE_WATCHING_FILTER } from '../actions/types.js';
import WatchingFilterModel from '../models/filters/watchingFilter.js';

const watchingFilter = localStorage.getItem('watchingFilter');

const initialState = {
  watchingFilter: watchingFilter
    ? JSON.parse(watchingFilter)
    : new WatchingFilterModel().getInitialState(),
};

const reducer = (state = initialState, action) => {
  const payload = action.payload;
  switch (action.type) {
    case UPDATE_WATCHING_FILTER:
      localStorage.setItem('watchingFilter', JSON.stringify(payload));
      return {
        ...state,
        watchingFilter: payload,
      };
    default:
      return state;
  }
};

export default reducer;
