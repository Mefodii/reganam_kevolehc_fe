import { isItem, isPlaylistItem } from '../playlistUtils';

const name = 'PlaylistSquareToCurly';

const ITEM_REGEX = /^(.)[[](.)[\]]/;
const PLAYLISTITEM_REGEX = /^(....)[[](.)[\]]/;

const run = (lines: string[]) =>
  lines.map((line) => {
    if (isItem(line)) return line.replace(ITEM_REGEX, '$1{$2}');
    if (isPlaylistItem(line)) return line.replace(PLAYLISTITEM_REGEX, '$1{$2}');
    return line;
  });

const transformer: Helper.Transformer = { name, run };
export default transformer;
