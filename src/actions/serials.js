import {
  GET_SERIAL_GROUPS,
  ADD_SERIAL_GROUP,
  UPDATE_SERIAL_GROUP,
  DELETE_SERIAL_GROUP,
  ADD_SERIAL_VIDEO,
  UPDATE_SERIAL_VIDEO,
  DELETE_SERIAL_VIDEO,
  ADD_SERIAL_POSTER,
  DELETE_SERIAL_POSTER,
} from "./types";

import {
  getGroups,
  addGroup,
  updateGroup,
  addVideo,
  updateVideo,
  deleteVideo,
  deleteGroup,
  deletePoster,
} from "../api/api";
import { addPoster } from "./posters";

// GROUP ACTIONS
export const getSerialGroups = () => async (dispatch, getState) => {
  const videoType = getState().info.videoTypes.serial;
  const { data: payload } = await getGroups(videoType);
  dispatch({
    type: GET_SERIAL_GROUPS,
    payload,
  });
};

export const addSerialGroup = (group) => async (dispatch) => {
  const { data } = await addGroup(group);
  dispatch({
    type: ADD_SERIAL_GROUP,
    payload: { group: data },
  });
};

export const updateSerialGroup = (group) => async (dispatch) => {
  const { data } = await updateGroup(group);
  dispatch({
    type: UPDATE_SERIAL_GROUP,
    payload: { group: data },
  });
};

export const deleteSerialGroup = (id) => async (dispatch) => {
  await deleteGroup(id);
  dispatch({
    type: DELETE_SERIAL_GROUP,
    payload: { id },
  });
};
// ----------------------------- //

// VIDEO ACTIONS
export const addSerialVideo = (video, groupId) => async (dispatch) => {
  const { data } = await addVideo(video);
  dispatch({
    type: ADD_SERIAL_VIDEO,
    payload: { video: data, groupId },
  });
};

export const updateSerialVideo = (video, groupId) => async (dispatch) => {
  const { data } = await updateVideo(video);
  dispatch({
    type: UPDATE_SERIAL_VIDEO,
    payload: { video: data, groupId },
  });
};

export const deleteSerialVideo = (id, groupId) => async (dispatch) => {
  await deleteVideo(id);
  dispatch({
    type: DELETE_SERIAL_VIDEO,
    payload: { id, groupId },
  });
};
// ----------------------------- //

// POSTER ACTIONS
export const addSerialPoster =
  (image, videoId, groupId) => async (dispatch) => {
    const response = await addPoster(image, videoId);
    dispatch({
      type: ADD_SERIAL_POSTER,
      payload: {
        poster: response.data,
        groupId,
        videoId,
      },
    });
  };

export const deleteSerialPoster =
  (id, videoId, groupId) => async (dispatch) => {
    await deletePoster(id);
    dispatch({
      type: DELETE_SERIAL_POSTER,
      payload: { id, videoId, groupId },
    });
  };
// ----------------------------- //
