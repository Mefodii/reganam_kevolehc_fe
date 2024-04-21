import { UPDATE_WATCHING_FILTER } from './types';

export const updateWatchingFilter = (filter) => async (dispatch) => {
  dispatch({
    type: UPDATE_WATCHING_FILTER,
    payload: filter,
  });
};
