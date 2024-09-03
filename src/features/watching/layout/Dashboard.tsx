import React, { useEffect } from 'react';
import { WatchingType } from '../../../api/api-utils';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
  ANIME_BACKGROUND,
  MOVIES_BACKGROUND,
  SERIALS_BACKGROUND,
} from '../../../util/frontend-urls';
import { GroupList } from '../groups/GroupList';
import { fetchGroups, selectGroupsByWatchingType } from '../groups/groupsSlice';

const PICTURE = {
  [WatchingType.ANIME]: ANIME_BACKGROUND,
  [WatchingType.SERIAL]: SERIALS_BACKGROUND,
  [WatchingType.MOVIE]: MOVIES_BACKGROUND,
};

type DashboardProps = {
  watchingType: WatchingType;
};

export const WatchingDashboard = React.memo(
  ({ watchingType }: DashboardProps) => {
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
  }
);
