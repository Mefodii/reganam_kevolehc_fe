import { combineReducers } from '@reduxjs/toolkit';
import { name as infoSliceName, reducer as info } from './info/infoSlice';
import { name as groupsName, reducer as groups } from './groups/groupsSlice';
import {
  name as filtersName,
  reducer as filters,
} from './filters/filtersSlice';
import { name } from './constants';

export { name };

export const reducer = combineReducers({
  [infoSliceName]: info,
  [groupsName]: groups,
  [filtersName]: filters,
});
