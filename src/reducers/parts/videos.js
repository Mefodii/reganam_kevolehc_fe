import { ADD_VIDEO, UPDATE_VIDEO, DELETE_VIDEO } from "../../actions/types.js";

import { add, update, del } from "../generic";

import { compareByKey } from "../../util/functions";

export const VIDEOS_SORT = compareByKey("order");

const reducer = (videos = [], action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_VIDEO:
      return add(videos, payload.video).sort(VIDEOS_SORT);

    case UPDATE_VIDEO:
      return update(videos, payload.video).sort(VIDEOS_SORT);

    case DELETE_VIDEO:
      return del(videos, payload.id);

    default:
      return videos;
  }
};

export default reducer;
