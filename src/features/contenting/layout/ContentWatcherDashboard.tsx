import React, { useEffect, useMemo } from 'react';

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
  selectPageInfo as selectMusicPageInfo,
} from '../contentMusicItems/contentMusicItemsSlice';
import { contentWatcher as model } from '../../../models';
import ContentMusicItemTable from '../contentMusicItems/ContentMusicItemsTable';
import ContentItemsTable from '../contentItems/ContentItemsTable';

const ContentWatcherDashboard: React.FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const contentWatcher = useAppSelector(selectDetails);

  const contentItems = useAppSelector(selectAllContentItems);
  const contentItemsPageInfo = useAppSelector(selectPageInfo);

  const contentMusicItems = useAppSelector(selectAllContentMusicItems);
  const contentMusicItemsPageInfo = useAppSelector(selectMusicPageInfo);

  useEffect(() => {
    if (!id) return;

    const req = dispatch(fetchContentWatcher(parseInt(id)));
    return () => {
      req.abort();
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (!contentWatcher) return;

    const contentList = contentWatcher.content_list;
    const req = model.isMusic(contentWatcher)
      ? dispatch(fetchContentMusicItems({ contentList }))
      : dispatch(fetchContentItems({ contentList }));

    return () => {
      req.abort();
    };
  }, [dispatch, contentWatcher]);

  const isLoading = !contentWatcher;

  const renderContentMusicItemTable = useMemo(() => {
    if (!contentMusicItemsPageInfo || isLoading) return <LoadingOverlay />;

    return (
      <ContentMusicItemTable
        contentList={contentWatcher.content_list}
        contentMusicItems={contentMusicItems}
        source={contentWatcher.source_type}
        pageInfo={contentMusicItemsPageInfo}
      />
    );
  }, [isLoading, contentMusicItemsPageInfo, contentMusicItems, contentWatcher]);

  const renderContentItemsTable = useMemo(() => {
    if (!contentItemsPageInfo || isLoading) return <LoadingOverlay />;

    return (
      <ContentItemsTable
        contentList={contentWatcher.content_list}
        contentItems={contentItems}
        source={contentWatcher.source_type}
        pageInfo={contentItemsPageInfo}
      />
    );
  }, [isLoading, contentItemsPageInfo, contentItems, contentWatcher]);

  if (isLoading) return <LoadingOverlay />;

  // QUESTION: - is it mandatory to always have overflow-hidden on each child? any workarounds?
  return (
    <div className='flex flex-1 flex-col items-center mono-font'>
      <div className='flex flex-col rounded-xl shadow-md space-y-5 w-10/12 p-5 my-5 bg-theme-1 border-2 border-theme-3 overflow-hidden'>
        <ContentWatcherDetails contentWatcher={contentWatcher} />
        {model.isMusic(contentWatcher)
          ? renderContentMusicItemTable
          : renderContentItemsTable}
      </div>
    </div>
  );
};

export default React.memo(
  ContentWatcherDashboard
) as typeof ContentWatcherDashboard;
