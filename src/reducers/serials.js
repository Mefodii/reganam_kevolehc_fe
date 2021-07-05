import {
  GET_SERIALS_GROUP,
  ADD_SERIAL_GROUP,
  DELETE_SERIAL_GROUP,
} from "../actions/types.js";

const initialState = {
  serials: [],
};

const reducer = (state = initialState, action) => {
  const payload = action.payload;
  switch (action.type) {
    case GET_SERIALS_GROUP:
      return {
        ...state,
        serials: payload,
      };
    case ADD_SERIAL_GROUP:
      return {
        ...state,
        serials: [...state.serials, payload],
      };
    case DELETE_SERIAL_GROUP:
      return {
        ...state,
        serials: state.serials.filter(({ id }) => id !== payload),
      };
    default:
      return state;
  }
};

export default reducer;
