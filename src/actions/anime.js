import { GET_ANIME_GROUPS, DELETE_ANIME_GROUP, ADD_ANIME_GROUP } from "./types";
import { getGroups, addGroup, deleteGroup } from "../api/api";

export const getAnimeGroups = () => async (dispatch, getState) => {
  const { data: payload } = await getGroups(getState().info.videoTypes.anime);
  dispatch({
    type: GET_ANIME_GROUPS,
    payload,
  });
};

export const addAnimeGroup = (anime) => async (dispatch) => {
  const { data: payload } = await addGroup(anime);
  dispatch({
    type: ADD_ANIME_GROUP,
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
