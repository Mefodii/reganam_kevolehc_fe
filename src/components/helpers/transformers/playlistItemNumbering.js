import { isItem, isPlaylistItem } from "../playlistUtils";

const name = "PlaylistItemNumbering";

const run = (lines) => {
  let counter = 0;
  return lines.map((line) => {
    if (isItem(line)) counter = 0;
    if (isPlaylistItem(line)) {
      counter += 1;
      return insertCounter(line, counter);
    }
    return line;
  });
};

const insertCounter = (line, counter) =>
  line.slice(0, 18) +
  ` ${counter.toString().padStart(4, "0")} |` +
  line.slice(18);

const transformer = { name, run };
export default transformer;
