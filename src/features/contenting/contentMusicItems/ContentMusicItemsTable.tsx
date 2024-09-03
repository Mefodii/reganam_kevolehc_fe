import React, { useCallback } from 'react';
import { ContentWatcherSource } from '../../../api/api-utils';
import { LoadingOverlay, Pagination, Table } from '../../../components/generic';
import { SVGEye, SVGEyeClosed, SVGPlus } from '../../../components/svg';
import { useAppDispatch, useAppSelector, useModal } from '../../../hooks';
import { ContentMusicItemForm } from './ContentMusicItemForm';
import { ContentMusicItemRow } from './ContentMusicItemRow';
import {
  fetchContentMusicItems,
  selectIsAPIPending,
} from './contentMusicItemsSlice';

type ContentMusicItemTableProps = {
  contentList: number;
  contentMusicItems: Model.ContentMusicItemDM[];
  source?: ContentWatcherSource;
  pageInfo: PageInfo<QParams.ContentMusicItem>;
};

export const ContentMusicItemTable = React.memo(
  ({
    contentList,
    contentMusicItems,
    source,
    pageInfo,
  }: ContentMusicItemTableProps) => {
    const hideConsumed: boolean = Boolean(pageInfo.currentParams?.hideConsumed);
    const dispatch = useAppDispatch();

    const isLoading = useAppSelector(selectIsAPIPending);

    const { openModal, closeModal } = useModal();

    const handleOpenContentMusicItemModal = useCallback(() => {
      const defaultPosition =
        contentMusicItems.length > 0 ? contentMusicItems.length + 1 : 1;

      openModal(
        <ContentMusicItemForm
          formProps={{
            content_list: contentList,
            defaultPosition,
            formMode: 'CREATE',
          }}
          onSuccess={() => closeModal()}
        />
      );
    }, [openModal, closeModal, contentMusicItems.length, contentList]);

    const renderUtilityPanel = () => {
      return (
        <Table.THead>
          <div className='flex w-1/3 items-center'></div>
          <div className='flex w-1/3'>
            <Pagination pageInfo={pageInfo} action={fetchContentMusicItems} />
          </div>
          <div className={`flex w-1/3 justify-end space-x-3`}>
            <SVGPlus
              className={`w-5 simple-clickable-1`}
              tooltip='Add Item'
              onClick={handleOpenContentMusicItemModal}
            />
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
  }
);
