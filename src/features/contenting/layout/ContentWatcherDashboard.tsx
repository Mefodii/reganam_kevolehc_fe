import { useEffect, useState } from 'react';

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
  const [isMusic, setIsMusic] = useState(false);

  const contentWatcher = useAppSelector(selectDetails);
  const contentItems = useAppSelector(selectAllContentItems);
  const contentMusicItems = useAppSelector(selectAllContentMusicItems);

  useEffect(() => {
    if (!id) return;
    dispatch(fetchContentWatcher(parseInt(id)));
  }, [dispatch, id]);

  useEffect(() => {
    if (!contentWatcher) return;

    if (model.isMusic(contentWatcher)) {
      setIsMusic(true);
      dispatch(fetchContentMusicItems(contentWatcher.content_list));
    } else {
      setIsMusic(false);
      dispatch(fetchContentItems(contentWatcher.content_list));
    }
  }, [dispatch, contentWatcher]);

  const isLoading = !contentWatcher;

  if (isLoading)
    return (
      <div>
        <LoadingOverlay loading={true} />
      </div>
    );

  // TODO: probably on each update an item, everything will be rendered.
  // Maybe it will be better to pass ids instead of whole objects

  return (
    <ContentContainer>
      <div className='content-container font-mono'>
        <ContentWatcherDetails contentWatcher={contentWatcher} />
        {isMusic ? (
          <ContentMusicItemTable contentMusicItems={contentMusicItems} />
        ) : (
          <ContentItemsTable contentItems={contentItems} />
        )}
      </div>
    </ContentContainer>
  );
};

export default ContentWatcherDashboard;
