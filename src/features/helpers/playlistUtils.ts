const ITEM_REGEX = /^.[[{].[\]}]/;
const PLAYLISTITEM_REGEX = /^....[[{}].[\]}]/;
const PLAYLISTITEM_COUNTER_REGEX = /^^.{16}\s[|]\s\d{4}\s[|]\s/;

const START_POS_ITEM_FLAG = 0;
const START_POS_TITLE = 5;
const START_POS_URL = 115;
const START_POS_NUMBER = 167;

export const isItem = (line: string): boolean => ITEM_REGEX.test(line);
export const isPlaylistItem = (line: string): boolean =>
  PLAYLISTITEM_REGEX.test(line);
export const isPlaylistItemWithCounter = (line: string): boolean =>
  PLAYLISTITEM_COUNTER_REGEX.test(line);

export const getPlaylistItemCounter = (line: string): number =>
  parseInt(line.slice(19, 23));

export class PlaylistItem {
  item_flag: string;
  title: string;
  url: string;
  number: number;
  children: string[];

  constructor(line: string) {
    this.item_flag = line.slice(START_POS_ITEM_FLAG, START_POS_TITLE).trim();
    this.title = line.slice(START_POS_TITLE, START_POS_URL).trim();
    this.url = line.slice(START_POS_URL, START_POS_NUMBER).trim();
    this.number = parseInt(line.slice(START_POS_NUMBER).trim());
    this.children = [];
  }

  toString = () => {
    let s = ''.padEnd(START_POS_ITEM_FLAG) + this.item_flag;
    s = s.padEnd(START_POS_TITLE) + this.title;
    s = s.padEnd(START_POS_URL) + this.url;
    s = s.padEnd(START_POS_NUMBER) + String(this.number);
    return s;
  };
}
