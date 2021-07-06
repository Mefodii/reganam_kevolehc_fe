import {
  GET_MOVIE_GROUPS,
  ADD_MOVIE_GROUP,
  DELETE_MOVIE_GROUP,
} from "../actions/types.js";

const initialState = {
  movies: [],
};

const reducer = (state = initialState, action) => {
  const payload = action.payload;
  switch (action.type) {
    case GET_MOVIE_GROUPS:
      return {
        ...state,
        movies: payload,
      };
    case ADD_MOVIE_GROUP:
      return {
        ...state,
        movies: [...state.movies, payload],
      };
    case DELETE_MOVIE_GROUP:
      return {
        ...state,
        movies: state.movies.filter(({ id }) => id !== payload),
      };
    default:
      return state;
  }
};

export default reducer;
