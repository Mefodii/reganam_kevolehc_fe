import {
  GET_GROUPS,
  GET_SERIAL_GROUPS,
  ADD_GROUP,
  ADD_SERIAL_GROUP,
  UPDATE_GROUP,
  UPDATE_SERIAL_GROUP,
  DELETE_GROUP,
  DELETE_SERIAL_GROUP,
  ADD_VIDEO,
  ADD_SERIAL_VIDEO,
  DELETE_VIDEO,
  DELETE_SERIAL_VIDEO,
  UPDATE_VIDEO,
  UPDATE_SERIAL_VIDEO,
  ADD_POSTER,
  ADD_SERIAL_POSTER,
  UPDATE_POSTER,
  UPDATE_SERIAL_POSTER,
  DELETE_POSTER,
  DELETE_SERIAL_POSTER,
} from "../actions/types.js";

import groupReducer from "./parts/groups";

const initialState = {
  groups: [],
};

const TYPES = {
  [GET_SERIAL_GROUPS]: GET_GROUPS,
  [ADD_SERIAL_GROUP]: ADD_GROUP,
  [UPDATE_SERIAL_GROUP]: UPDATE_GROUP,
  [DELETE_SERIAL_GROUP]: DELETE_GROUP,
  [ADD_SERIAL_VIDEO]: ADD_VIDEO,
  [UPDATE_SERIAL_VIDEO]: UPDATE_VIDEO,
  [DELETE_SERIAL_VIDEO]: DELETE_VIDEO,
  [ADD_SERIAL_POSTER]: ADD_POSTER,
  [UPDATE_SERIAL_POSTER]: UPDATE_POSTER,
  [DELETE_SERIAL_POSTER]: DELETE_POSTER,
};
const reduceType = (type) => (TYPES[type] ? TYPES[type] : type);

const GROUP_ACTION_TYPES = [
  GET_GROUPS,
  ADD_GROUP,
  UPDATE_GROUP,
  DELETE_GROUP,
  ADD_VIDEO,
  UPDATE_VIDEO,
  DELETE_VIDEO,
  ADD_POSTER,
  UPDATE_POSTER,
  DELETE_POSTER,
];
const isGroupType = (type) => GROUP_ACTION_TYPES.find((_) => type === _);

const reducer = (state = initialState, action) => {
  const { groups } = state;
  const { payload } = action;
  const type = reduceType(action.type);

  switch (type) {
    case isGroupType(type):
      return {
        ...state,
        groups: groupReducer(groups, { payload, type }),
      };
    default:
      return state;
  }
};

export default reducer;
