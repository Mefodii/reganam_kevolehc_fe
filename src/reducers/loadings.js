import { ADD_GROUP_LOADING, DELETE_GROUP_LOADING } from "../actions/types.js";

const initialState = {
  groups: [],
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_GROUP_LOADING:
      return { ...state, groups: [...state.groups, payload] };
    case DELETE_GROUP_LOADING:
      return { ...state, groups: state.groups.filter((gr) => gr !== payload) };
    default:
      return state;
  }
};

export default reducer;
