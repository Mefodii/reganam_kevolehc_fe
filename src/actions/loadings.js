import { ADD_GROUP_LOADING, DELETE_GROUP_LOADING } from "./types";

export const addGroupLoading = (groupId) => (dispatch) => {
  dispatch({
    type: ADD_GROUP_LOADING,
    payload: groupId,
  });
};

export const deleteGroupLoading = (groupId) => (dispatch) => {
  dispatch({
    type: DELETE_GROUP_LOADING,
    payload: groupId,
  });
};
