import { isItem, PlaylistItem } from '../playlistUtils';

const name = 'PlaylistToYoutubePlaylist';

const YOUTUBE_PLAYLIST_STUB = 'https://www.youtube.com/watch_videos?video_ids=';
const YOUTUBE_WATCH_STUB = 'https://www.youtube.com/watch?v=';

const run = (lines: string[]): string[] => {
  const items = lines
    .filter((line) => isItem(line))
    .map((line) => new PlaylistItem(line));
  const ids = items.map((item) => extractIdFromUrl(item.url));
  return toYTPlaylist(ids);
};

export const toYTPlaylist = (ytIds: string[]): string[] => {
  let result = [];
  const step = 50;
  for (let i = 0; i < ytIds.length; i += step) {
    result.push(
      `${YOUTUBE_PLAYLIST_STUB}${ytIds.slice(i, i + step).join(',')}`
    );

    // Printing to console how many videos are in the playlist (if batch < 50).
    // Sometimes YT automatically excludes some videos when building the playlist from video_ids
    if (i + step > ytIds.length) {
      console.log(ytIds.length - i);
    }
  }

  return result;
};

const extractIdFromUrl = (url: string) => url.replace(YOUTUBE_WATCH_STUB, '');

export const playlistToYoutubePlaylist: Helper.Transformer = { name, run };
