export enum WatchingType {
  ANIME = 'Anime',
  MOVIE = 'Movie',
  SERIAL = 'Serial',
}

export enum WatchingStatus {
  DROPPED = 'Dropped',
  PLANNED = 'Planned',
  IGNORED = 'Ignored',
  PREMIERE = 'Premiere',
  WATCHING = 'Watching',
  FINISHED = 'Finished',
}

export const isWatchingQueue = (status?: string) =>
  status === WatchingStatus.PLANNED || status === WatchingStatus.WATCHING;

export enum WatchingAirStatus {
  UNKNOWN = 'Unknown',
  ONGOING = 'Ongoing',
  COMPLETED = 'Completed',
}

export enum ContentCategory {
  MUSIC = 'Music',
  FUN = 'Fun',
  GAME = 'Game',
  TECH = 'Tech',
  OTHER = 'Other',
}

export enum DownloadStatus {
  NONE = 'NONE',
  PENDING = 'PENDING',
  DOWNLOADING = 'DOWNLOADING',
  DOWNLOADED = 'DOWNLOADED',
  UNABLE = 'UNABLE',
  MISSING = 'MISSING',
  SKIP = 'SKIP',
}

export enum ContentMusic {
  UNKNOWN = 'Unknown',
  NOT_MUSIC = 'NotMusic',
  SINGLE = 'Single',
  PLAYLIST = 'Playlist',
}

export enum ContentWatcherSource {
  YOUTUBE = 'Youtube',
  BANDCAMP = 'Bandcamp',
  OTHER = 'Other',
}

export enum ContentWatcherStatus {
  WAITING = 'Waiting',
  RUNNING = 'Running',
  FINISHED = 'Finished',
  WARNING = 'Warning',
  ERROR = 'Error',
  DEAD = 'Dead',
  IGNORE = 'Ignore',
  NONE = 'None',
}

export enum ContentWatcherExtension {
  MP3 = 'mp3',
  MP4 = 'mp4',
  MKV = 'mkv',
}

export enum ContentWatcherQuality {
  DEFAULT = -1,
  Q720 = 720,
  Q1080 = 1080,
}

export enum TrackStatus {
  NONE = 'None',
  LIKE = 'Like',
  DISLIKE = 'Dislike',
  MISSING = 'Missing',
  DOWNLOADED = 'Downloaded',
  IN_LIBRARY = 'In Library',
}
