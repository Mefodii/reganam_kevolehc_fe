import { isItem, PlaylistItem } from '../playlistUtils';

const name = 'PlaylistToYoutubePlaylist';

const YOUTUBE_PLAYLIST_STUB = 'https://www.youtube.com/watch_videos?video_ids=';
const YOUTUBE_WATCH_STUB = 'https://www.youtube.com/watch?v=';

const run = (lines) => {
  const items = lines
    .filter((line) => isItem(line))
    .map((line) => new PlaylistItem(line));
  const ids = items.map((item) => extractIdFromUrl(item.url));

  let result = [];
  const step = 50;
  for (let index = 0; index < ids.length; index += step) {
    result.push(
      `${YOUTUBE_PLAYLIST_STUB}${ids.slice(index, index + step).join(',')}`
    );
  }

  return result;
};

const extractIdFromUrl = (url) => url.replace(YOUTUBE_WATCH_STUB, '');

const transformer = { name, run };
export default transformer;
