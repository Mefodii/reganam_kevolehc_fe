import React, { useEffect } from 'react';

import {
  fetchContentWatcher,
  selectDetails,
} from '../contentWatchers/contentWatchersSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { useParams } from 'react-router-dom';
import ContentWatcherDetails from '../contentWatchers/ContentWatcherDetails';
import { LoadingOverlay } from '../../../components/generic';
import {
  fetchContentItems,
  selectAllContentItems,
  selectPageInfo,
} from '../contentItems/contentItemsSlice';
import {
  fetchContentMusicItems,
  selectAllContentMusicItems,
} from '../contentMusicItems/contentMusicItemsSlice';
import { contentWatcher as model } from '../../../models';
import ContentMusicItemTable from '../contentMusicItems/ContentMusicItemsTable';
import ContentItemsTable from '../contentItems/ContentItemsTable';

const ContentWatcherDashboard = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const contentWatcher = useAppSelector(selectDetails);

  const contentItems = useAppSelector(selectAllContentItems);
  const contentItemsPageInfo = useAppSelector(selectPageInfo);

  const contentMusicItems = useAppSelector(selectAllContentMusicItems);

  useEffect(() => {
    if (!id) return;
    dispatch(fetchContentWatcher(parseInt(id)));
  }, [dispatch, id]);

  useEffect(() => {
    if (!contentWatcher) return;

    if (model.isMusic(contentWatcher)) {
      dispatch(fetchContentMusicItems(contentWatcher.content_list));
    } else {
      dispatch(
        fetchContentItems({
          contentList: contentWatcher.content_list,
        })
      );
    }
  }, [dispatch, contentWatcher]);

  const isLoading = !contentWatcher;

  if (isLoading) return <LoadingOverlay />;

  // QUESTION: - is it mandatory to always have overflow-hidden on each child? any workarounds?
  return (
    <div className='flex flex-1 flex-col items-center mono-font'>
      <div className='flex flex-col rounded-xl shadow-md space-y-5 w-10/12 p-5 my-5 bg-theme-1 border-2 border-theme-3 overflow-hidden'>
        <ContentWatcherDetails contentWatcher={contentWatcher} />
        {model.isMusic(contentWatcher) ? (
          <ContentMusicItemTable contentMusicItems={contentMusicItems} />
        ) : contentItemsPageInfo ? (
          <ContentItemsTable
            contentItems={contentItems}
            pageInfo={contentItemsPageInfo}
          />
        ) : (
          <LoadingOverlay />
        )}
      </div>
    </div>
  );
};

export default React.memo(ContentWatcherDashboard);
