import { combineReducers } from '@reduxjs/toolkit';
import { name as groupsName, reducer as groups } from './groups/groupsSlice';
import {
  name as filtersName,
  reducer as filters,
} from './filters/filtersSlice';
import { name } from './constants';

export { name };

export const reducer = combineReducers({
  [groupsName]: groups,
  [filtersName]: filters,
});
