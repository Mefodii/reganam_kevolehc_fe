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
import { ContentContainer } from '../../../components/layout';
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

  const isLoading = !contentWatcher || !contentItemsPageInfo;

  if (isLoading)
    return (
      <div>
        <LoadingOverlay loading={true} />
      </div>
    );

  return (
    <ContentContainer>
      <div className='content-container font-mono'>
        <ContentWatcherDetails contentWatcher={contentWatcher} />
        {model.isMusic(contentWatcher) ? (
          <ContentMusicItemTable contentMusicItems={contentMusicItems} />
        ) : (
          <ContentItemsTable
            contentItems={contentItems}
            pageInfo={contentItemsPageInfo}
          />
        )}
      </div>
    </ContentContainer>
  );
};

export default React.memo(ContentWatcherDashboard);
