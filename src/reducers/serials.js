import { GET_SERIALS, ADD_SERIAL, DELETE_SERIAL } from "../actions/types.js";

const initialState = {
  serials: [],
};

const reducer = (state = initialState, action) => {
  const payload = action.payload;
  switch (action.type) {
    case GET_SERIALS:
      return {
        ...state,
        serials: payload,
      };
    case ADD_SERIAL:
      return {
        ...state,
        serials: [...state.serials, payload],
      };
    case DELETE_SERIAL:
      return {
        ...state,
        serials: state.serials.filter(({ id }) => id !== payload),
      };
    default:
      return state;
  }
};

export default reducer;
