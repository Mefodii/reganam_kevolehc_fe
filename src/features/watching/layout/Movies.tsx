import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';

import { MOVIES_BACKGROUND } from '../../../util/frontend-urls';

import GroupList from '../groups/GroupList';

import { fetchGroups, selectGroupsByWatchingType } from '../groups/groupsSlice';
import { WatchingType } from '../../../api/api-utils';

const watchingType = WatchingType.MOVIE;

const Movies = () => {
  const dispatch = useAppDispatch();

  const groups = useAppSelector((state) =>
    selectGroupsByWatchingType(state, watchingType)
  );
  useEffect(() => {
    dispatch(fetchGroups(watchingType));
  }, [dispatch]);

  if (!watchingType) return <></>;

  return (
    <GroupList
      watchingType={watchingType}
      groups={groups}
      backgroundPicture={MOVIES_BACKGROUND}
    ></GroupList>
  );
};

export default Movies;
