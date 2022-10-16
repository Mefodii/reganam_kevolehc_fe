import {
  GET_CONTENT_WATCHERS,
  ADD_CONTENT_WATCHER,
  UPDATE_CONTENT_WATCHER,
  DELETE_CONTENT_WATCHER,
} from "../actions/types.js";

import { add, update, del } from "./generic";

const reducer = (contentWatchers = [], action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_CONTENT_WATCHERS:
      return payload.contentWatchers;
    case ADD_CONTENT_WATCHER:
      return add(contentWatchers, payload.contentWatcher);
    case UPDATE_CONTENT_WATCHER:
      return update(contentWatchers, payload.contentWatcher);
    case DELETE_CONTENT_WATCHER:
      return del(contentWatchers, payload.id);
    default:
      return contentWatchers;
  }
};

export default reducer;
