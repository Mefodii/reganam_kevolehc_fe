import {
  isItem,
  isPlaylistItem,
  isPlaylistItemWithCounter,
  getPlaylistItemCounter,
} from '../playlistUtils';

const name = 'PlaylistItemNumbering';

const run = (lines) => {
  let counter = 0;

  return lines.map((line) => {
    if (isItem(line)) counter = 0;

    if (isPlaylistItem(line)) {
      counter += 1;

      if (isPlaylistItemWithCounter(line)) {
        const lineCounter = getPlaylistItemCounter(line);
        if (counter !== lineCounter) {
          console.log(
            `Replacing counter. Expected ${counter}, got ${lineCounter}. Line: ${line}`
          );
          return replaceCounter(line, counter);
        }

        return line;
      }

      return insertCounter(line, counter);
    }

    return line;
  });
};

const insertCounter = (line, counter) =>
  `${line.slice(0, 18)} ${counter.toString().padStart(4, '0')} |${line.slice(
    18
  )}`;

const replaceCounter = (line, counter) =>
  insertCounter(line.slice(0, 18) + line.slice(25), counter);

const transformer = { name, run };
export default transformer;
