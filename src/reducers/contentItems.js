import {
  GET_CONTENT_ITEMS,
  ADD_CONTENT_ITEM,
  UPDATE_CONTENT_ITEM,
  DELETE_CONTENT_ITEM,
} from "../actions/types.js";

import { add, update, del } from "./generic";

const reducer = (contentItems = [], action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_CONTENT_ITEMS:
      return contentItems;
    case ADD_CONTENT_ITEM:
      return add(contentItems, payload.contentItem);
    case UPDATE_CONTENT_ITEM:
      return update(contentItems, payload.contentItem);
    case DELETE_CONTENT_ITEM:
      return del(contentItems, payload.id);
    default:
      return contentItems;
  }
};

export default reducer;
