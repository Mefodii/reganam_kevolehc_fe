import axios from 'axios';

import {
  API_GROUPS,
  API_VIDEOS,
  API_POSTERS,
  API_CONTENT_LISTS,
  API_CONTENT_ITEMS,
  API_CONTENT_TRACKS,
  API_CONTENT_WATCHERS,
  API_CONTENT_MUSIC_ITEMS,
} from './backend-urls';

import {
  jsonConfig as json,
  jsonWithParamsConfig as paramsConf,
  formDataConfig as formConf,
} from './config';

// GROUPS API
export const getGroups = async (watchingType: string) =>
  await axios.get<Model.GroupDM[]>(
    API_GROUPS,
    paramsConf({ videoType: watchingType })
  );

export const getGroup = async (id: number) =>
  await axios.get<Model.GroupDM>(`${API_GROUPS}${id}/`, json());

export const addGroup = async (group: Model.GroupAM) =>
  await axios.post<Model.GroupDM>(API_GROUPS, group, json());

export const updateGroup = async (group: Model.GroupDM) =>
  await axios.put<Model.GroupDM>(`${API_GROUPS}${group.id}/`, group, json());

export const deleteGroup = async (id: number) =>
  await axios.delete<void>(`${API_GROUPS}${id}/`, json());
// ----------------------------- //

// VIDEOS API
export const getVideos = async (group: number) =>
  await axios.get<Model.VideoDM[]>(API_VIDEOS, paramsConf({ group }));

export const addVideo = async (video: Model.VideoAM) =>
  await axios.post<Model.VideoDM>(API_VIDEOS, video, json());

export const updateVideo = async (video: Model.VideoDM) =>
  await axios.put<Model.VideoDM>(`${API_VIDEOS}${video.id}/`, video, json());

export const deleteVideo = async (id: number) =>
  await axios.delete<Model.VideoDM>(`${API_VIDEOS}${id}/`, json());
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

export const getContentListsPure = async () =>
  await axios.get<Model.ContentListPureDM[]>(
    API_CONTENT_LISTS,
    paramsConf({ getCLP: true })
  );

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
export const getContentItems = async (params: QParams.ContentItem) =>
  await axios.get<AxiosPageResult<Model.ContentItemDM, QParams.ContentItem>>(
    API_CONTENT_ITEMS,
    paramsConf(params)
  );

export const addContentItem = async (contentItem: Model.ContentItemAM) =>
  await axios.post<Model.ContentItemDM>(API_CONTENT_ITEMS, contentItem, json());

export const updateContentItem = async (contentItem: Model.ContentItemDM) =>
  await axios.put<Model.ContentItemDM>(
    `${API_CONTENT_ITEMS}${contentItem.id}/`,
    contentItem,
    json()
  );

export const updateContentItems = async (contentItems: Model.ContentItemDM[]) =>
  await axios.put<Model.ContentItemDM[]>(
    API_CONTENT_ITEMS,
    contentItems,
    json()
  );

export const deleteContentItem = async (id: number) =>
  await axios.delete<void>(`${API_CONTENT_ITEMS}${id}/`, json());

export const deleteContentItems = async (ids: number[]) =>
  await axios<void>({ method: 'delete', url: API_CONTENT_ITEMS, data: ids });
// ----------------------------- //

// CONTENT MUSIC ITEMS API
export const getContentMusicItems = async (contentList: number) =>
  await axios.get<Model.ContentMusicItemDM[]>(
    API_CONTENT_MUSIC_ITEMS,
    paramsConf({ contentList })
  );

export const addContentMusicItem = async (
  contentMusicItem: Model.ContentMusicItemAM
) =>
  await axios.post<Model.ContentMusicItemDM>(
    API_CONTENT_MUSIC_ITEMS,
    contentMusicItem,
    json()
  );

export const updateContentMusicItem = async (
  contentMusicItem: Model.ContentMusicItemDM
) =>
  await axios.put<Model.ContentMusicItemDM>(
    `${API_CONTENT_MUSIC_ITEMS}${contentMusicItem.id}/`,
    contentMusicItem,
    json()
  );

export const deleteContentMusicItem = async (id: number) =>
  await axios.delete<void>(`${API_CONTENT_MUSIC_ITEMS}${id}/`, json());
// ----------------------------- //

// CONTENT ITEM PARTS API
export const getContentTracks = async () =>
  await axios.get<Model.ContentTrackDM[]>(API_CONTENT_TRACKS, json());

export const addContentTrack = async (contentTrack: Model.ContentTrackAM) =>
  await axios.post<Model.ContentTrackDM>(
    API_CONTENT_TRACKS,
    contentTrack,
    json()
  );

export const updateContentTrack = async (contentTrack: Model.ContentTrackDM) =>
  await axios.put<Model.ContentTrackDM>(
    `${API_CONTENT_TRACKS}${contentTrack.id}/`,
    contentTrack,
    json()
  );

export const deleteContentTrack = async (id: number) =>
  await axios.delete<void>(`${API_CONTENT_TRACKS}${id}/`, json());
// ----------------------------- //

// CONTENT LISTS API
export const getContentWatchers = async () =>
  await axios.get<Model.ContentWatcherDM[]>(API_CONTENT_WATCHERS, json());

export const getContentWatcher = async (id: number) =>
  await axios.get<Model.ContentWatcherDM>(
    `${API_CONTENT_WATCHERS}${id}/`,
    json()
  );

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
