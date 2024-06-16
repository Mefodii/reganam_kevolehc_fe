import { useEffect } from 'react';

import { ANIME_BACKGROUND } from '../../../util/frontend-urls';

import GroupList from '../groups/GroupList';

import { fetchGroups, selectGroupsByWatchingType } from '../groups/groupsSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { WatchingType } from '../../../api/api-utils';

const watchingType = WatchingType.ANIME;

const Anime = () => {
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
      backgroundPicture={ANIME_BACKGROUND}
    ></GroupList>
  );
};

export default Anime;
