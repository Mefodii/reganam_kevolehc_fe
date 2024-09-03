import axios from 'axios';
import {
  API_ARTISTS,
  API_CONTENT_ITEMS,
  API_CONTENT_LISTS,
  API_CONTENT_MUSIC_ITEMS,
  API_CONTENT_TRACKS,
  API_CONTENT_WATCHERS,
  API_GROUPS,
  API_POSTERS,
  API_TRACKS,
  API_VIDEOS,
} from './backend-urls';
import {
  formDataConfig as formConf,
  jsonConfig as json,
  jsonWithParamsConfig as paramsConf,
} from './config';

// GROUPS API
export async function getGroups(watchingType: string, signal: AbortSignal) {
  const conf = paramsConf({ watchingType }, signal);
  return await axios.get<Model.GroupDM[]>(API_GROUPS, conf);
}

export async function getGroup(id: number, signal: AbortSignal) {
  const conf = json(signal);
  return await axios.get<Model.GroupDM>(`${API_GROUPS}${id}/`, conf);
}

export async function addGroup(group: Model.GroupSM, signal: AbortSignal) {
  const conf = json(signal);
  return await axios.post<Model.GroupDM>(API_GROUPS, group, conf);
}

export async function updateGroup(group: Model.GroupDM, signal: AbortSignal) {
  const conf = json(signal);
  return await axios.put<Model.GroupDM>(
    `${API_GROUPS}${group.id}/`,
    group,
    conf
  );
}

export async function deleteGroup(id: number, signal: AbortSignal) {
  const conf = json(signal);
  return await axios.delete<void>(`${API_GROUPS}${id}/`, conf);
}
// ----------------------------- //

// VIDEOS API
export async function getVideos(group: number, signal: AbortSignal) {
  const conf = paramsConf({ group }, signal);
  return await axios.get<Model.VideoDM[]>(API_VIDEOS, conf);
}

export async function addVideo(video: Model.VideoSM, signal: AbortSignal) {
  const conf = json(signal);
  return await axios.post<Model.VideoDM>(API_VIDEOS, video, conf);
}

export async function updateVideo(video: Model.VideoDM, signal: AbortSignal) {
  const conf = json(signal);
  return await axios.put<Model.VideoDM>(
    `${API_VIDEOS}${video.id}/`,
    video,
    conf
  );
}

export async function deleteVideo(id: number, signal: AbortSignal) {
  const conf = json(signal);
  return await axios.delete<Model.VideoDM>(`${API_VIDEOS}${id}/`, conf);
}
// ----------------------------- //

// POSTERS API
export async function addPoster(posterForm: FormData, signal: AbortSignal) {
  const conf = formConf(signal);
  return await axios.post<Model.PosterDM>(API_POSTERS, posterForm, conf);
}

export async function updatePoster(
  poster: Model.PosterDM,
  posterForm: FormData,
  signal: AbortSignal
) {
  const conf = formConf(signal);
  return await axios.put<Model.PosterDM>(
    `${API_POSTERS}${poster.id}/`,
    posterForm,
    conf
  );
}

export async function deletePoster(id: number, signal: AbortSignal) {
  const conf = json(signal);
  return await axios.delete<void>(`${API_POSTERS}${id}/`, conf);
}
// ----------------------------- //

// CONTENT LISTS API
export async function getContentLists(signal: AbortSignal) {
  const conf = json(signal);
  return await axios.get<Model.ContentListDM[]>(API_CONTENT_LISTS, conf);
}

export async function getContentListsPure(signal: AbortSignal) {
  const conf = paramsConf({ getCLP: true }, signal);
  return await axios.get<Model.ContentListPureDM[]>(API_CONTENT_LISTS, conf);
}

export async function getContentList(id: number, signal: AbortSignal) {
  const conf = json(signal);
  return await axios.get<Model.ContentListDM>(
    `${API_CONTENT_LISTS}${id}/`,
    conf
  );
}

export async function addContentList(
  contentList: Model.ContentListSM,
  signal: AbortSignal
) {
  const conf = json(signal);
  return await axios.post<Model.ContentListDM>(
    API_CONTENT_LISTS,
    contentList,
    conf
  );
}

export async function updateContentList(
  contentList: Model.ContentListDM,
  signal: AbortSignal
) {
  const conf = json(signal);
  return await axios.put<Model.ContentListDM>(
    `${API_CONTENT_LISTS}${contentList.id}/`,
    contentList,
    conf
  );
}

export async function deleteContentList(id: number, signal: AbortSignal) {
  const conf = json(signal);
  return await axios.delete<void>(`${API_CONTENT_LISTS}${id}/`, conf);
}
// ----------------------------- //

// CONTENT ITEMS API
export async function getContentItems(
  params: QParams.ContentItem,
  signal: AbortSignal
) {
  const conf = paramsConf(params, signal);
  return await axios.get<
    Axios.PagedResult<Model.ContentItemDM, QParams.ContentItem>
  >(API_CONTENT_ITEMS, conf);
}

export async function addContentItem(
  contentItem: Model.ContentItemSM,
  signal: AbortSignal
) {
  const conf = json(signal);
  return await axios.post<Model.ContentItemDM>(
    API_CONTENT_ITEMS,
    contentItem,
    conf
  );
}

export async function updateContentItem(
  contentItem: Model.ContentItemDM,
  signal: AbortSignal
) {
  const conf = json(signal);
  return await axios.put<Model.ContentItemDM>(
    `${API_CONTENT_ITEMS}${contentItem.id}/`,
    contentItem,
    conf
  );
}

export async function updateContentItems(
  contentItems: Model.ContentItemDM[],
  signal: AbortSignal
) {
  const conf = json(signal);
  return await axios.put<Model.ContentItemDM[]>(
    API_CONTENT_ITEMS,
    contentItems,
    conf
  );
}

export async function deleteContentItem(id: number, signal: AbortSignal) {
  const conf = json(signal);
  return await axios.delete<void>(`${API_CONTENT_ITEMS}${id}/`, conf);
}

export async function deleteContentItems(ids: number[], signal: AbortSignal) {
  return await axios({
    method: 'delete',
    url: API_CONTENT_ITEMS,
    data: ids,
    signal,
  });
}
// ----------------------------- //

// CONTENT MUSIC ITEMS API
export async function getContentMusicItems(
  params: QParams.ContentItem,
  signal: AbortSignal
) {
  const conf = paramsConf(params, signal);
  return await axios.get<
    Axios.PagedResult<Model.ContentMusicItemDM, QParams.ContentMusicItem>
  >(API_CONTENT_MUSIC_ITEMS, conf);
}

export async function addContentMusicItem(
  contentMusicItem: Model.ContentMusicItemSM,
  signal: AbortSignal
) {
  const conf = json(signal);
  return await axios.post<Model.ContentMusicItemDM>(
    API_CONTENT_MUSIC_ITEMS,
    contentMusicItem,
    conf
  );
}

export async function updateContentMusicItem(
  contentMusicItem: Model.ContentMusicItemDM,
  signal: AbortSignal
) {
  const conf = json(signal);
  return await axios.put<Model.ContentMusicItemDM>(
    `${API_CONTENT_MUSIC_ITEMS}${contentMusicItem.id}/`,
    contentMusicItem,
    conf
  );
}

export async function updateContentMusicItems(
  contentMusicItems: Model.ContentMusicItemDM[],
  signal: AbortSignal
) {
  const conf = json(signal);
  return await axios.put<Model.ContentMusicItemDM[]>(
    API_CONTENT_MUSIC_ITEMS,
    contentMusicItems,
    conf
  );
}

export async function deleteContentMusicItem(id: number, signal: AbortSignal) {
  const conf = json(signal);
  return await axios.delete<void>(`${API_CONTENT_MUSIC_ITEMS}${id}/`, conf);
}

export async function deleteContentMusicItems(
  ids: number[],
  signal: AbortSignal
) {
  return await axios({
    method: 'delete',
    url: API_CONTENT_MUSIC_ITEMS,
    data: ids,
    signal,
  });
}
// ----------------------------- //

// CONTENT ITEM PARTS API
export async function getContentTracks(signal: AbortSignal) {
  const conf = json(signal);
  return await axios.get<Model.ContentTrackDM[]>(API_CONTENT_TRACKS, conf);
}

export async function addContentTrack(
  contentTrack: Model.ContentTrackSM,
  signal: AbortSignal
) {
  const conf = json(signal);
  return await axios.post<Model.ContentTrackDM>(
    API_CONTENT_TRACKS,
    contentTrack,
    conf
  );
}

export async function updateContentTrack(
  contentTrack: Model.ContentTrackDM,
  signal: AbortSignal
) {
  const conf = json(signal);
  return await axios.put<Model.ContentTrackDM>(
    `${API_CONTENT_TRACKS}${contentTrack.id}/`,
    contentTrack,
    conf
  );
}

export async function deleteContentTrack(id: number, signal: AbortSignal) {
  const conf = json(signal);
  return await axios.delete<void>(`${API_CONTENT_TRACKS}${id}/`, conf);
}
// ----------------------------- //

// CONTENT LISTS API
export async function getContentWatchers(signal: AbortSignal) {
  const conf = json(signal);
  return await axios.get<Model.ContentWatcherDM[]>(API_CONTENT_WATCHERS, conf);
}

export async function getContentWatcher(id: number, signal: AbortSignal) {
  const conf = json(signal);
  return await axios.get<Model.ContentWatcherDM>(
    `${API_CONTENT_WATCHERS}${id}/`,
    conf
  );
}

export async function addContentWatcher(
  contentWatcher: Model.ContentWatcherSM,
  signal: AbortSignal
) {
  const conf = json(signal);
  return await axios.post<Model.ContentWatcherDM>(
    API_CONTENT_WATCHERS,
    contentWatcher,
    conf
  );
}

export async function updateContentWatcher(
  contentWatcher: Model.ContentWatcherDM,
  signal: AbortSignal
) {
  const conf = json(signal);
  return await axios.put<Model.ContentWatcherDM>(
    `${API_CONTENT_WATCHERS}${contentWatcher.id}/`,
    contentWatcher,
    conf
  );
}

export async function deleteContentWatcher(id: number, signal: AbortSignal) {
  const conf = json(signal);
  return await axios.delete<void>(`${API_CONTENT_WATCHERS}${id}/`, conf);
}
// ----------------------------- //

// TRACKS API
export async function getTracks(params: QParams.Track, signal: AbortSignal) {
  const conf = paramsConf(params, signal);
  return await axios.get<Axios.PagedResult<Model.TrackDM, QParams.Track>>(
    API_TRACKS,
    conf
  );
}

export async function addTrack(track: Model.TrackSM, signal: AbortSignal) {
  const conf = json(signal);
  return await axios.post<Model.TrackDM>(API_TRACKS, track, conf);
}

export async function updateTrack(track: Model.TrackDM, signal: AbortSignal) {
  const conf = json(signal);
  return await axios.put<Model.TrackDM>(
    `${API_TRACKS}${track.id}/`,
    track,
    conf
  );
}

export async function updateTracks(
  tracks: Model.TrackDM[],
  signal: AbortSignal
) {
  const conf = json(signal);
  return await axios.put<Model.TrackDM[]>(API_TRACKS, tracks, conf);
}

export async function deleteTrack(id: number, signal: AbortSignal) {
  const conf = json(signal);
  return await axios.delete<void>(`${API_TRACKS}${id}/`, conf);
}

export async function deleteTracks(ids: number[], signal: AbortSignal) {
  return await axios({
    method: 'delete',
    url: API_TRACKS,
    data: ids,
    signal,
  });
}
// ----------------------------- //

// ARTISTS API
export async function getArtists(params: QParams.Artist, signal: AbortSignal) {
  const conf = paramsConf(params, signal);
  return await axios.get<Axios.PagedResult<Model.ArtistDM, QParams.Artist>>(
    API_ARTISTS,
    conf
  );
}

export async function addArtist(artist: Model.ArtistSM, signal: AbortSignal) {
  const conf = json(signal);
  return await axios.post<Model.ArtistDM>(API_ARTISTS, artist, conf);
}

export async function updateArtist(
  artist: Model.ArtistDM,
  signal: AbortSignal
) {
  const conf = json(signal);
  return await axios.put<Model.ArtistDM>(
    `${API_ARTISTS}${artist.id}/`,
    artist,
    conf
  );
}

export async function updateArtists(
  artists: Model.ArtistDM[],
  signal: AbortSignal
) {
  const conf = json(signal);
  return await axios.put<Model.ArtistDM[]>(API_ARTISTS, artists, conf);
}

export async function deleteArtist(id: number, signal: AbortSignal) {
  const conf = json(signal);
  return await axios.delete<void>(`${API_ARTISTS}${id}/`, conf);
}

export async function deleteArtists(ids: number[], signal: AbortSignal) {
  return await axios({
    method: 'delete',
    url: API_ARTISTS,
    data: ids,
    signal,
  });
}
// ----------------------------- //
