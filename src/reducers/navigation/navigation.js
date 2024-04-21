import {
  SET_WATCHERS,
  SET_WATCHER,
  SET_LISTS,
  SET_LIST,
} from '../../actions/types';

import contentingReducer, { initialState as contentingIS } from './contenting';

const initialState = {
  contenting: contentingIS,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_WATCHERS:
    case SET_WATCHER:
    case SET_LISTS:
    case SET_LIST:
      return {
        ...state,
        contenting: contentingReducer(state.contenting, action),
      };
    default:
      return state;
  }
};

export default reducer;
