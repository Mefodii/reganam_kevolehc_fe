import {
  GET_CONTENT_LISTS,
  ADD_CONTENT_LIST,
  UPDATE_CONTENT_LIST,
  DELETE_CONTENT_LIST,
} from "../actions/types.js";

import { add, update, del } from "./generic";

const reducer = (contentLists = [], action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_CONTENT_LISTS:
      return contentLists;
    case ADD_CONTENT_LIST:
      return add(contentLists, payload.contentList);
    case UPDATE_CONTENT_LIST:
      return update(contentLists, payload.contentList);
    case DELETE_CONTENT_LIST:
      return del(contentLists, payload.id);
    default:
      return contentLists;
  }
};

export default reducer;
