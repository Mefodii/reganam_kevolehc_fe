const ITEM_REGEX = /^.[[{].[\]}]/;
const PLAYLISTITEM_REGEX = /^....[[{}].[\]}]/;

export const isItem = (line) => ITEM_REGEX.test(line);
export const isPlaylistItem = (line) => PLAYLISTITEM_REGEX.test(line);
