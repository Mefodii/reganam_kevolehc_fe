import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { ContentListList } from '../contentLists/ContentListList';
import {
  fetchContentLists,
  selectAllContentLists,
} from '../contentLists/contentListsSlice';
import { ContentWatcherList } from '../contentWatchers/ContentWatcherList';
import {
  fetchContentWatchers,
  selectAllContentWatchers,
} from '../contentWatchers/contentWatchersSlice';
import { Sidepanel } from './Sidepanel';

export const ContentingDashboard = React.memo(() => {
  const dispatch = useAppDispatch();

  const contentWatchers = useAppSelector(selectAllContentWatchers);
  const contentLists = useAppSelector(selectAllContentLists);

  useEffect(() => {
    const req = dispatch(fetchContentWatchers());
    const req2 = dispatch(fetchContentLists());

    return () => {
      req.abort();
      req2.abort();
    };
  }, [dispatch]);

  return (
    <div className='flex flex-1'>
      <Sidepanel />
      <div className='flex flex-col py-5 px-10 bg-theme-2 w-full overflow-auto'>
        <ContentWatcherList contentWatchers={contentWatchers} />
        <ContentListList contentLists={contentLists} />
      </div>
    </div>
  );
});
