import axios from 'axios';

import {
  API_GROUPS,
  API_VIDEOS,
  API_POSTERS,
  API_WATCHING_INFO,
  API_CONTENT_LISTS,
  API_CONTENT_ITEMS,
  API_CONTENT_ITEM_PARTS,
  API_CONTENT_WATCHERS,
  API_CONTENTING_INFO,
} from './backend-urls';

import {
  jsonConfig as json,
  jsonWithParamsConfig as paramsConf,
  formDataConfig as formConf,
} from './config';

// GROUPS API
export const getGroups = async (videoType) =>
  await axios.get(API_GROUPS, paramsConf({ videoType }));

export const addGroup = async (group) =>
  await axios.post(API_GROUPS, group, json());

export const updateGroup = async (group) =>
  await axios.put(`${API_GROUPS}${group.id}/`, group, json());

export const deleteGroup = async (id) =>
  await axios.delete(`${API_GROUPS}${id}/`, json());
// ----------------------------- //

// VIDEOS API
export const getVideos = async () => await axios.get(API_VIDEOS, json());

export const addVideo = async (video) =>
  await axios.post(API_VIDEOS, video, json());

export const updateVideo = async (video) =>
  await axios.put(`${API_VIDEOS}${video.id}/`, video, json());

export const deleteVideo = async (id) =>
  await axios.delete(`${API_VIDEOS}${id}/`, json());
// ----------------------------- //

// POSTERS API
export const addPoster = async (posterForm) =>
  await axios.post(API_POSTERS, posterForm, formConf());

export const updatePoster = async (id, posterForm) =>
  await axios.put(`${API_POSTERS}${id}/`, posterForm, formConf());

export const deletePoster = async (id) =>
  await axios.delete(`${API_POSTERS}${id}/`, json());
// ----------------------------- //

// CONTENT LISTS API
export const getContentLists = async () =>
  await axios.get(API_CONTENT_LISTS, json());

export const addContentList = async (contentList) =>
  await axios.post(API_CONTENT_LISTS, contentList, json());

export const updateContentList = async (contentList) =>
  await axios.put(
    `${API_CONTENT_LISTS}${contentList.id}/`,
    contentList,
    json()
  );

export const deleteContentList = async (id) =>
  await axios.delete(`${API_CONTENT_LISTS}${id}/`, json());
// ----------------------------- //

// CONTENT ITEMS API
export const getContentItems = async () =>
  await axios.get(API_CONTENT_ITEMS, json());

export const addContentItem = async (contentItem) =>
  await axios.post(API_CONTENT_ITEMS, contentItem, json());

export const updateContentItem = async (contentItem) =>
  await axios.put(
    `${API_CONTENT_ITEMS}${contentItem.id}/`,
    contentItem,
    json()
  );

export const deleteContentItem = async (id) =>
  await axios.delete(`${API_CONTENT_ITEMS}${id}/`, json());
// ----------------------------- //

// CONTENT ITEM PARTS API
export const getContentItemParts = async () =>
  await axios.get(API_CONTENT_ITEM_PARTS, json());

export const addContentItemPart = async (contentItemPart) =>
  await axios.post(API_CONTENT_ITEM_PARTS, contentItemPart, json());

export const updateContentItemPart = async (contentItemPart) =>
  await axios.put(
    `${API_CONTENT_ITEM_PARTS}${contentItemPart.id}/`,
    contentItemPart,
    json()
  );

export const deleteContentItemPart = async (id) =>
  await axios.delete(`${API_CONTENT_ITEM_PARTS}${id}/`, json());
// ----------------------------- //

// CONTENT LISTS API
export const getContentWatchers = async () =>
  await axios.get(API_CONTENT_WATCHERS, json());

export const addContentWatcher = async (contentWatcher) =>
  await axios.post(API_CONTENT_WATCHERS, contentWatcher, json());

export const updateContentWatcher = async (contentWatcher) =>
  await axios.put(
    `${API_CONTENT_WATCHERS}${contentWatcher.id}/`,
    contentWatcher,
    json()
  );

export const deleteContentWatcher = async (id) =>
  await axios.delete(`${API_CONTENT_WATCHERS}${id}/`, json());
// ----------------------------- //

// OTHER API
export const getWatchingInfo = async () =>
  await axios.get(API_WATCHING_INFO, json());

export const getContentingInfo = async () =>
  await axios.get(API_CONTENTING_INFO, json());
// ----------------------------- //
