import { isItem, isPlaylistItem } from '../playlistUtils';

const name = 'PlaylistAddCarret';

const PLAYLISTITEM_REGEX = /^\s/;

const run = (lines: string[]) =>
  lines.map((line) => {
    if (isItem(line) && isApprovedToAdd(line))
      return line.replace(PLAYLISTITEM_REGEX, '^');

    if (isPlaylistItem(line) && isApprovedToAdd(line))
      return line.replace(PLAYLISTITEM_REGEX, '^');
    return line;
  });

const isApprovedToAdd = (line: string) => line[5] === 'x' || line[2] === 'X';

export const playlistAddCarret: Helper.Transformer = { name, run };
