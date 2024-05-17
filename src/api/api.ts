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
export const getGroups = async (videoType: string) =>
  await axios.get<Model.GroupDM[]>(API_GROUPS, paramsConf({ videoType }));

export const addGroup = async (group: Model.GroupAM) =>
  await axios.post<Model.GroupDM>(API_GROUPS, group, json());

export const updateGroup = async (group: Model.GroupDM) =>
  await axios.put<Model.GroupDM>(`${API_GROUPS}${group.id}/`, group, json());

export const deleteGroup = async (id: number) =>
  await axios.delete<void>(`${API_GROUPS}${id}/`, json());
// ----------------------------- //

// VIDEOS API
export const getVideos = async () =>
  await axios.get<Model.VideoDM[]>(API_VIDEOS, json());

export const addVideo = async (video: Model.VideoAM) =>
  await axios.post<Model.GroupDM>(API_VIDEOS, video, json());

export const updateVideo = async (video: Model.VideoDM) =>
  await axios.put<Model.GroupDM>(`${API_VIDEOS}${video.id}/`, video, json());

export const deleteVideo = async (id: number) =>
  await axios.delete<Model.GroupDM>(`${API_VIDEOS}${id}/`, json());
// ----------------------------- //

// POSTERS API
export const addPoster = async (posterForm: FormData) =>
  await axios.post<Model.PosterDM>(API_POSTERS, posterForm, formConf());

export const updatePoster = async (
  poster: Model.PosterDM,
  posterForm: FormData
) =>
  await axios.put<Model.PosterDM>(
    `${API_POSTERS}${poster.id}/`,
    posterForm,
    formConf()
  );

export const deletePoster = async (id: number) =>
  await axios.delete<void>(`${API_POSTERS}${id}/`, json());
// ----------------------------- //

// CONTENT LISTS API
export const getContentLists = async () =>
  await axios.get<Model.ContentListDM[]>(API_CONTENT_LISTS, json());

export const addContentList = async (contentList: Model.ContentListAM) =>
  await axios.post<Model.ContentListDM>(API_CONTENT_LISTS, contentList, json());

export const updateContentList = async (contentList: Model.ContentListDM) =>
  await axios.put<Model.ContentListDM>(
    `${API_CONTENT_LISTS}${contentList.id}/`,
    contentList,
    json()
  );

export const deleteContentList = async (id: number) =>
  await axios.delete<void>(`${API_CONTENT_LISTS}${id}/`, json());
// ----------------------------- //

// CONTENT ITEMS API
export const getContentItems = async () =>
  await axios.get<Model.ContentItemDM[]>(API_CONTENT_ITEMS, json());

export const addContentItem = async (contentItem: Model.ContentItemAM) =>
  await axios.post<Model.ContentItemDM>(API_CONTENT_ITEMS, contentItem, json());

export const updateContentItem = async (contentItem: Model.ContentItemDM) =>
  await axios.put<Model.ContentItemDM>(
    `${API_CONTENT_ITEMS}${contentItem.id}/`,
    contentItem,
    json()
  );

export const deleteContentItem = async (id: number) =>
  await axios.delete<void>(`${API_CONTENT_ITEMS}${id}/`, json());
// ----------------------------- //

// CONTENT ITEM PARTS API
export const getContentItemParts = async () =>
  await axios.get<Model.ContentItemPartDM[]>(API_CONTENT_ITEM_PARTS, json());

export const addContentItemPart = async (
  contentItemPart: Model.ContentItemPartAM
) =>
  await axios.post<Model.ContentItemPartDM>(
    API_CONTENT_ITEM_PARTS,
    contentItemPart,
    json()
  );

export const updateContentItemPart = async (
  contentItemPart: Model.ContentItemPartDM
) =>
  await axios.put<Model.ContentItemPartDM>(
    `${API_CONTENT_ITEM_PARTS}${contentItemPart.id}/`,
    contentItemPart,
    json()
  );

export const deleteContentItemPart = async (id: number) =>
  await axios.delete<void>(`${API_CONTENT_ITEM_PARTS}${id}/`, json());
// ----------------------------- //

// CONTENT LISTS API
export const getContentWatchers = async () =>
  await axios.get<Model.ContentWatcherDM[]>(API_CONTENT_WATCHERS, json());

export const addContentWatcher = async (
  contentWatcher: Model.ContentWatcherAM
) =>
  await axios.post<Model.ContentWatcherDM>(
    API_CONTENT_WATCHERS,
    contentWatcher,
    json()
  );

export const updateContentWatcher = async (
  contentWatcher: Model.ContentWatcherDM
) =>
  await axios.put<Model.ContentWatcherDM>(
    `${API_CONTENT_WATCHERS}${contentWatcher.id}/`,
    contentWatcher,
    json()
  );

export const deleteContentWatcher = async (id: number) =>
  await axios.delete<void>(`${API_CONTENT_WATCHERS}${id}/`, json());
// ----------------------------- //

// OTHER API
export const getWatchingInfo = async () =>
  await axios.get<Model.WatchingInfo>(API_WATCHING_INFO, json());

export const getContentingInfo = async () =>
  await axios.get<Model.ContentingInfo>(API_CONTENTING_INFO, json());
// ----------------------------- //
