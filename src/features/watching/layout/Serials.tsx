import { useEffect } from 'react';

import { SERIALS_BACKGROUND } from '../../../util/frontend-urls';

import GroupList from '../groups/GroupList';

import { selectSerialType } from '../info/infoSlice';
import { fetchGroups, selectGroupsByWatchingType } from '../groups/groupsSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks';

const Serials = () => {
  const dispatch = useAppDispatch();

  const watchingType = useAppSelector(selectSerialType);
  const groups = useAppSelector((state) =>
    selectGroupsByWatchingType(state, watchingType)
  );
  useEffect(() => {
    if (watchingType) dispatch(fetchGroups(watchingType));
  }, [dispatch, watchingType]);

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
