import React, { useEffect, useMemo } from 'react';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { useParams } from 'react-router-dom';
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
import { contentList as model } from '../../../models';
import ContentMusicItemTable from '../contentMusicItems/ContentMusicItemsTable';
import ContentItemsTable from '../contentItems/ContentItemsTable';
import {
  fetchContentList,
  selectDetails,
} from '../contentLists/contentListsSlice';
import ContentListDetails from '../contentLists/ContentListDetails';

const ContentListDashboard: React.FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const contentList = useAppSelector(selectDetails);

  const contentItems = useAppSelector(selectAllContentItems);
  const contentItemsPageInfo = useAppSelector(selectPageInfo);

  const contentMusicItems = useAppSelector(selectAllContentMusicItems);
  const contentMusicItemsPageInfo = useAppSelector(selectMusicPageInfo);

  useEffect(() => {
    if (!id) return;

    const req = dispatch(fetchContentList(parseInt(id)));
    return () => {
      req.abort();
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (!contentList) return;

    const id = contentList.id;
    const req = model.isMusic(contentList)
      ? dispatch(fetchContentMusicItems({ contentList: id }))
      : dispatch(fetchContentItems({ contentList: id }));

    return () => {
      req.abort();
    };
  }, [dispatch, contentList]);

  const isLoading = !contentList;

  const renderContentMusicItemTable = useMemo(() => {
    if (!contentMusicItemsPageInfo || isLoading) return <LoadingOverlay />;

    return (
      <ContentMusicItemTable
        contentList={contentList.id}
        count={contentList.items_count}
        contentMusicItems={contentMusicItems}
        pageInfo={contentMusicItemsPageInfo}
      />
    );
  }, [isLoading, contentMusicItemsPageInfo, contentMusicItems, contentList]);

  const renderContentItemsTable = useMemo(() => {
    if (!contentItemsPageInfo || isLoading) return <LoadingOverlay />;

    return (
      <ContentItemsTable
        contentList={contentList.id}
        count={contentList.items_count}
        contentItems={contentItems}
        pageInfo={contentItemsPageInfo}
      />
    );
  }, [isLoading, contentItemsPageInfo, contentItems, contentList]);

  if (isLoading) return <LoadingOverlay />;

  return (
    <div className='flex flex-1 flex-col items-center mono-font'>
      <div className='flex flex-col rounded-xl shadow-md space-y-5 w-10/12 p-5 my-5 bg-theme-1 border-2 border-theme-3 overflow-hidden'>
        <ContentListDetails contentList={contentList} />
        {model.isMusic(contentList)
          ? renderContentMusicItemTable
          : renderContentItemsTable}
      </div>
    </div>
  );
};

export default React.memo(ContentListDashboard) as typeof ContentListDashboard;
