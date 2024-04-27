import { isItem, isPlaylistItem } from '../playlistUtils';

const name = 'PlaylistAddCarret';

const PLAYLISTITEM_REGEX = /^\s/;

const run = (lines) =>
  lines.map((line) => {
    if (isItem(line) && isApprovedToAdd(line))
      return line.replace(PLAYLISTITEM_REGEX, '^');

    if (isPlaylistItem(line) && isApprovedToAdd(line))
      return line.replace(PLAYLISTITEM_REGEX, '^');
    return line;
  });

const isApprovedToAdd = (line) => line[5] === 'x' || line[2] === 'X';

const transformer = { name, run };
export default transformer;
