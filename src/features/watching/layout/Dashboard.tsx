import { useEffect } from 'react';

import {
  ANIME_BACKGROUND,
  SERIALS_BACKGROUND,
  MOVIES_BACKGROUND,
} from '../../../util/frontend-urls';

import GroupList from '../groups/GroupList';

import { fetchGroups, selectGroupsByWatchingType } from '../groups/groupsSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { WatchingType } from '../../../api/api-utils';

const PICTURE = {
  [WatchingType.ANIME]: ANIME_BACKGROUND,
  [WatchingType.SERIAL]: SERIALS_BACKGROUND,
  [WatchingType.MOVIE]: MOVIES_BACKGROUND,
};

type DashboardProps = {
  watchingType: WatchingType;
};

const Dashboard: React.FC<DashboardProps> = ({ watchingType }) => {
  const dispatch = useAppDispatch();

  const groups = useAppSelector((state) =>
    selectGroupsByWatchingType(state, watchingType)
  );
  useEffect(() => {
    const req = dispatch(fetchGroups(watchingType));
    return () => req.abort();
  }, [dispatch, watchingType]);

  return (
    <GroupList
      watchingType={watchingType}
      groups={groups}
      backgroundPicture={PICTURE[watchingType]}
    ></GroupList>
  );
};

export default Dashboard;
