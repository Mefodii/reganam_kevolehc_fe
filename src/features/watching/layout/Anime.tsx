import { useEffect } from 'react';

import { ANIME_BACKGROUND } from '../../../util/frontend-urls';

import GroupList from '../groups/GroupList';

import { selectAnimeType } from '../info/infoSlice';
import { fetchGroups, selectGroupsByWatchingType } from '../groups/groupsSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks';

const Anime = () => {
  const dispatch = useAppDispatch();

  const watchingType = useAppSelector(selectAnimeType);
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
      backgroundPicture={ANIME_BACKGROUND}
    ></GroupList>
  );
};

export default Anime;
