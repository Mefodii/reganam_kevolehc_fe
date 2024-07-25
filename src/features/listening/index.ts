import { combineReducers } from '@reduxjs/toolkit';
import { name as tracksName, reducer as tracks } from './tracks/tracksSlice';
import {
  name as artistsName,
  reducer as artists,
} from './artists/artistsSlice';

import { name } from './constants';

export { name };

export const reducer = combineReducers({
  [tracksName]: tracks,
  [artistsName]: artists,
});
