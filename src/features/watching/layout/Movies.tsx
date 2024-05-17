import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';

import { MOVIES_BACKGROUND } from '../../../util/frontend-urls';

import GroupList from '../groups/GroupList';

import { selectMovieType } from '../info/infoSlice';
import { fetchGroups, selectGroupsByWatchingType } from '../groups/groupsSlice';

const Movies = () => {
  const dispatch = useAppDispatch();

  const watchingType = useAppSelector(selectMovieType);
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
      backgroundPicture={MOVIES_BACKGROUND}
    ></GroupList>
  );
};

export default Movies;
