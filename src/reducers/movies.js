import { GET_MOVIES, ADD_MOVIE, DELETE_MOVIE } from "../actions/types.js";

const initialState = {
  movies: [],
};

const reducer = (state = initialState, action) => {
  const payload = action.payload;
  switch (action.type) {
    case GET_MOVIES:
      return {
        ...state,
        movies: payload,
      };
    case ADD_MOVIE:
      return {
        ...state,
        movies: [...state.movies, payload],
      };
    case DELETE_MOVIE:
      return {
        ...state,
        movies: state.movies.filter(({ id }) => id !== payload),
      };
    default:
      return state;
  }
};

export default reducer;
