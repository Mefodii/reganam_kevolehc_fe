import { LOAD_COMPLETE, UPDATE_THEME } from "../actions/types.js";

const initialState = {
  isLoading: true,
  theme: "default-theme",
};

const reducer = (state = initialState, action) => {
  const payload = action.payload;
  switch (action.type) {
    case LOAD_COMPLETE:
      return {
        ...state,
        isLoading: false,
      };
    case UPDATE_THEME:
      return {
        ...state,
        theme: payload,
      };
    default:
      return state;
  }
};

export default reducer;
