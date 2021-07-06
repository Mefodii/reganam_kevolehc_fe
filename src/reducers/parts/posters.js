import {
  ADD_POSTER,
  UPDATE_POSTER,
  DELETE_POSTER,
} from "../../actions/types.js";

import { add, update, del } from "../generic";

const reducer = (posters = [], action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_POSTER:
      return add(posters, payload.poster);

    case UPDATE_POSTER:
      return update(posters, payload.poster);

    case DELETE_POSTER:
      return del(posters, payload.id);

    default:
      return posters;
  }
};

export default reducer;
