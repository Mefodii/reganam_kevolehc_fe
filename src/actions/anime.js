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
  const { data: payload } = await addGroup(group);
  dispatch({
    type: ADD_ANIME_GROUP,
    payload,
  });
};

export const updateAnimeGroup = (group) => async (dispatch) => {
  const { data: payload } = await updateGroup(group);
  dispatch({
    type: UPDATE_ANIME_GROUP,
    payload,
  });
};

export const deleteAnimeGroup = (id) => async (dispatch) => {
  await deleteGroup(id);
  dispatch({
    type: DELETE_ANIME_GROUP,
    payload: id,
  });
};
// ----------------------------- //

// VIDEO ACTIONS
export const addAnimeVideo = (video) => async (dispatch) => {
  const { data: payload } = await addVideo(video);
  dispatch({
    type: ADD_ANIME_VIDEO,
    payload,
  });
};

export const updateAnimeVideo = (video) => async (dispatch) => {
  const { data: payload } = await updateVideo(video);
  dispatch({
    type: UPDATE_ANIME_VIDEO,
    payload,
  });
};

export const deleteAnimeVideo = (id) => async (dispatch) => {
  await deleteVideo(id);
  dispatch({
    type: DELETE_ANIME_VIDEO,
    payload: id,
  });
};
// ----------------------------- //

// POSTER ACTIONS
export const addAnimePoster = (image, videoId, groupId) => async (dispatch) => {
  const response = await addPoster(image, videoId);
  dispatch({
    type: ADD_ANIME_POSTER,
    payload: {
      poster: response.data,
      groupId,
      videoId,
    },
  });
};

export const deleteAnimePoster = (id, videoId, groupId) => async (dispatch) => {
  await deletePoster(id);
  dispatch({
    type: DELETE_ANIME_POSTER,
    payload: { id, videoId, groupId },
  });
};
// ----------------------------- //
