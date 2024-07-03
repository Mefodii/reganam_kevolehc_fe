import React from 'react';
import ContentMusicItemRow from './ContentMusicItemRow';
import { LoadingOverlay, Pagination, Table } from '../../../components/generic';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
  fetchContentMusicItems,
  selectIsAPIPending,
} from './contentMusicItemsSlice';
import { ContentWatcherSource } from '../../../api/api-utils';
import { SVGEye, SVGEyeClosed } from '../../../components/svg';

type ContentMusicItemTableProps = {
  contentList: number;
  count: number;
  contentMusicItems: Model.ContentMusicItemDM[];
  source: ContentWatcherSource;
  pageInfo: PageInfo<QParams.ContentMusicItem>;
};

const ContentMusicItemTable: React.FC<ContentMusicItemTableProps> = ({
  contentList,
  count,
  contentMusicItems,
  source,
  pageInfo,
}) => {
  const hideConsumed: boolean = Boolean(pageInfo.currentParams?.hideConsumed);
  const dispatch = useAppDispatch();

  const isLoading = useAppSelector(selectIsAPIPending);

  const renderUtilityPanel = () => {
    return (
      <Table.THead>
        <div className='flex w-1/3 items-center'></div>
        <div className='flex w-1/3'>
          <Pagination pageInfo={pageInfo} action={fetchContentMusicItems} />
        </div>
        <div className={`flex w-1/3 justify-end`}>
          <div
            className={`cursor-pointer ${
              hideConsumed ? 'text-active-2' : 'text-text-1'
            }`}
            onClick={() =>
              dispatch(
                fetchContentMusicItems({
                  ...pageInfo.currentParams,
                  page: 1,
                  hideConsumed: !hideConsumed,
                })
              )
            }
          >
            {hideConsumed ? (
              <SVGEyeClosed className={`w-5`} tooltip='Show Consumed' />
            ) : (
              <SVGEye className={`w-5`} tooltip='Hide Consumed' />
            )}
          </div>
        </div>
      </Table.THead>
    );
  };

  return (
    <Table.TContainer>
      {renderUtilityPanel()}
      <LoadingOverlay loading={isLoading} />
      <Table.TBody>
        {contentMusicItems.map((contentMusicItem, i) => (
          <ContentMusicItemRow key={i} contentMusicItem={contentMusicItem} />
        ))}
      </Table.TBody>
    </Table.TContainer>
  );
};

export default React.memo(ContentMusicItemTable);
