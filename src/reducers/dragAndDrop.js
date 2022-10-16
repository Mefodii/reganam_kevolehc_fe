import {
  SET_DRAG_DATA,
  REMOVE_DRAG_DATA,
  SET_DRAG_COPY,
} from "../actions/types.js";

const initialState = {
  item: undefined,
  type: undefined,
  copy: false,
};

const reducer = (state = initialState, action) => {
  const { item, type, copy } = action.payload || {};

  switch (action.type) {
    case SET_DRAG_DATA:
      return { ...state, item, type, copy };
    case SET_DRAG_COPY:
      return { ...state, copy };
    case REMOVE_DRAG_DATA:
      return {
        ...state,
        item: undefined,
        type: undefined,
        copy: false,
      };
    default:
      return state;
  }
};

export default reducer;
