import { UPDATE_WATCHIO_FILTER } from "./types";

export const updateWatchioFilter = (filter) => (dispatch) => {
  dispatch({
    type: UPDATE_WATCHIO_FILTER,
    payload: filter,
  });
};
