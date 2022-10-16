import {
  GET_CONTENT_ITEM_PARTS,
  ADD_CONTENT_ITEM_PART,
  UPDATE_CONTENT_ITEM_PART,
  DELETE_CONTENT_ITEM_PART,
} from "../actions/types.js";

import { add, update, del } from "./generic";

const reducer = (contentItemParts = [], action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_CONTENT_ITEM_PARTS:
      return payload.contentItemParts;
    case ADD_CONTENT_ITEM_PART:
      return add(contentItemParts, payload.contentItemPart);
    case UPDATE_CONTENT_ITEM_PART:
      return update(contentItemParts, payload.contentItemPart);
    case DELETE_CONTENT_ITEM_PART:
      return del(contentItemParts, payload.id);
    default:
      return contentItemParts;
  }
};

export default reducer;
