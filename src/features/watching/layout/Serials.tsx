import { useEffect } from 'react';

import { SERIALS_BACKGROUND } from '../../../util/frontend-urls';

import GroupList from '../groups/GroupList';

import { fetchGroups, selectGroupsByWatchingType } from '../groups/groupsSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { WatchingType } from '../../../api/api-utils';

const watchingType = WatchingType.SERIAL;

const Serials = () => {
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
      backgroundPicture={SERIALS_BACKGROUND}
    ></GroupList>
  );
};

export default Serials;
