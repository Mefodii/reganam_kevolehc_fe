import { useEffect } from 'react';

import Sidepanel from './Sidepanel';

import {
  fetchContentWatchers,
  selectAllContentWatchers,
} from '../contentWatchers/contentWatchersSlice';
import {
  fetchContentLists,
  selectAllContentLists,
} from '../contentLists/contentListsSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks';

const Dashboard = () => {
  const dispatch = useAppDispatch();

  const contentWatchers = useAppSelector(selectAllContentWatchers);
  const contentLists = useAppSelector(selectAllContentLists);

  useEffect(() => {
    dispatch(fetchContentWatchers());
    dispatch(fetchContentLists());
  }, [dispatch]);

  return (
    <div className='flex grow'>
      <Sidepanel />
      <div className='py-5 px-10 bg-theme-2 w-full'>
        {contentWatchers.map((_, i) => (
          <div key={i}>{JSON.stringify(_)}</div>
        ))}
        {contentLists.map((_, i) => (
          <div key={i}>{JSON.stringify(_)}</div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
