import {
  GET_ANIME_GROUPS,
  ADD_ANIME_GROUP,
  UPDATE_ANIME_GROUP,
  DELETE_ANIME_GROUP,
  ADD_ANIME_VIDEO,
  UPDATE_ANIME_VIDEO,
  DELETE_ANIME_VIDEO,
  ADD_ANIME_POSTER,
  DELETE_ANIME_POSTER,
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
export const getAnimeGroups = () => async (dispatch, getState) => {
  const videoType = getState().info.videoTypes.anime;
  const { data: payload } = await getGroups(videoType);
  dispatch({
    type: GET_ANIME_GROUPS,
    payload,
  });
};

export const addAnimeGroup = (group) => async (dispatch) => {
  const { data } = await addGroup(group);
  dispatch({
    type: ADD_ANIME_GROUP,
    payload: { group: data },
  });
};

export const updateAnimeGroup = (group) => async (dispatch) => {
  const { data } = await updateGroup(group);
  dispatch({
    type: UPDATE_ANIME_GROUP,
    payload: { group: data },
  });
};

export const deleteAnimeGroup = (id) => async (dispatch) => {
  await deleteGroup(id);
  dispatch({
    type: DELETE_ANIME_GROUP,
    payload: { id },
  });
};
// ----------------------------- //

// VIDEO ACTIONS
export const addAnimeVideo = (video, groupId) => async (dispatch) => {
  const { data } = await addVideo(video);
  dispatch({
    type: ADD_ANIME_VIDEO,
    payload: { video: data, groupId },
  });
};

export const updateAnimeVideo = (video, groupId) => async (dispatch) => {
  const { data } = await updateVideo(video);
  dispatch({
    type: UPDATE_ANIME_VIDEO,
    payload: { video: data, groupId },
  });
};

export const deleteAnimeVideo = (id, groupId) => async (dispatch) => {
  await deleteVideo(id);
  dispatch({
    type: DELETE_ANIME_VIDEO,
    payload: { id, groupId },
  });
};
// ----------------------------- //

// POSTER ACTIONS
export const addAnimePoster = (image, groupId) => async (dispatch) => {
  const response = await addPoster(image, groupId);
  dispatch({
    type: ADD_ANIME_POSTER,
    payload: {
      poster: response.data,
      groupId,
    },
  });
};

export const deleteAnimePoster = (id, groupId) => async (dispatch) => {
  await deletePoster(id);
  dispatch({
    type: DELETE_ANIME_POSTER,
    payload: { id, groupId },
  });
};
// ----------------------------- //
