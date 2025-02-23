import React, { useCallback, useEffect, useState } from 'react';
import { ContentWatcherSource } from '../../../api/api-utils';
import { UtilityPanelSVG } from '../../../components/buttons';
import { Checkbox } from '../../../components/form';
import { LoadingOverlay, Pagination, Table } from '../../../components/generic';
import {
  SVGClipboardDocEmpty,
  SVGCross,
  SVGEye,
  SVGEyeClosed,
  SVGEyeSlash,
  SVGPlus,
  SVGYoutube,
} from '../../../components/svg';
import {
  useAppDispatch,
  useAppSelector,
  useListSelect,
  useModal,
} from '../../../hooks';
import {
  filterSelectedItems,
  joinByNewline,
  saveToClipboard,
} from '../../../util/functions';
import { toYTPlaylist } from '../../helpers/transformers/playlistToYoutubePlaylist';
import { ContentItemForm } from './ContentItemForm';
import { ContentItemRow } from './ContentItemRow';
import { ContentItemSearch } from './ContentItemSearch';
import {
  deleteContentItems,
  fetchContentItems,
  selectIsAPIPending,
  updateContentItems,
} from './contentItemsSlice';

type ContentItemsTableProps = {
  contentList: number;
  contentItems: Model.ContentItemDM[];
  source?: ContentWatcherSource;
  pageInfo: PageInfo<QParams.ContentItem>;
};

export const ContentItemsTable = React.memo(
  ({ contentList, contentItems, source, pageInfo }: ContentItemsTableProps) => {
    const hideConsumed: boolean = Boolean(pageInfo.currentParams?.hideConsumed);
    const dispatch = useAppDispatch();

    const isLoading = useAppSelector(selectIsAPIPending);
    const [isSelectMode, setIsSelectMode] = useState(false);
    const [selectedIndexes, handleSelect, resetSelection] = useListSelect();

    const { openModal, closeModal, openConfirmationModal } = useModal();

    const handleSetConsumed = (consumed: boolean) => {
      const selectedItems = filterSelectedItems(contentItems, selectedIndexes);
      if (selectedItems.every((item) => item.consumed === consumed)) {
        // No change in consumed status
        return;
      }

      const newItems = selectedItems.map((contentItem) => ({
        ...contentItem,
        consumed,
      }));
      // TODO: (L) - a bug here. when hideConsumed == true and setting consumed all items on a page and on last page,
      //  then it will refetch the same page which does not exist anymore
      dispatch(updateContentItems(newItems))
        .unwrap()
        .then(() => hideConsumed && resetSelection());
    };

    const handleDelete = () => {
      const selectedItems = filterSelectedItems(contentItems, selectedIndexes);
      if (selectedItems.length === 0) return;

      openConfirmationModal({
        title: `Delete ${selectedItems.length} items?`,
        onConfirm: () => {
          dispatch(deleteContentItems(selectedItems))
            .unwrap()
            .then(() => resetSelection());
        },
      });
    };

    const handleOpenContentItemModal = useCallback(() => {
      const defaultPosition =
        contentItems.length > 0 ? contentItems.length + 1 : 1;

      openModal(
        <ContentItemForm
          formProps={{
            content_list: contentList,
            defaultPosition,
            formMode: 'CREATE',
          }}
          onSuccess={() => closeModal()}
        />
      );
    }, [openModal, closeModal, contentItems.length, contentList]);

    const handleCopyAsYTPlaylist = () => {
      const selectedItems = filterSelectedItems(contentItems, selectedIndexes);
      if (!selectedItems) return;

      const playlists = toYTPlaylist(selectedItems.map((item) => item.item_id));
      saveToClipboard(
        playlists.length === 1 ? playlists[0] : joinByNewline(playlists)
      );
    };

    useEffect(() => {
      resetSelection();
    }, [hideConsumed, isSelectMode, resetSelection]);

    const renderUtilityPanel = () => {
      return (
        <Table.THead>
          <div className='w-full'>
            <div className='flex'>
              <div className='flex w-1/3 items-center'>
                <Checkbox
                  className='rounded-none px-2 border-opacity-70'
                  name='showPosters'
                  text='Select Mode'
                  checked={isSelectMode}
                  onChange={() => setIsSelectMode(!isSelectMode)}
                  simple
                />
                <div className={`pl-5 ${isSelectMode ? '' : 'opacity-10'}`}>
                  <div className={`flex space-x-3`}>
                    <UtilityPanelSVG
                      SVG={SVGEye}
                      disabled={!isSelectMode}
                      tooltip='Set Consumed'
                      onClick={() => handleSetConsumed(true)}
                    />
                    <UtilityPanelSVG
                      SVG={SVGEyeSlash}
                      disabled={!isSelectMode}
                      tooltip='Set Not Consumed'
                      onClick={() => handleSetConsumed(false)}
                    />
                    <UtilityPanelSVG
                      SVG={SVGClipboardDocEmpty}
                      disabled={!isSelectMode}
                      tooltip='Copy items as text'
                    />
                    <UtilityPanelSVG
                      SVG={SVGYoutube}
                      disabled={!isSelectMode}
                      tooltip='Copy as YT Playlist'
                      onClick={handleCopyAsYTPlaylist}
                    />
                    <UtilityPanelSVG
                      SVG={SVGCross}
                      disabled={!isSelectMode}
                      tooltip='Delete'
                      onClick={handleDelete}
                    />
                  </div>
                  <div className='pt-2 text-sm text-active-1/70'>{`${selectedIndexes.length}: Selected`}</div>
                </div>
              </div>
              <div className='flex w-1/3'>
                <Pagination pageInfo={pageInfo} action={fetchContentItems} />
              </div>
              <div className={`flex w-1/3 justify-end space-x-3`}>
                <SVGPlus
                  className={`w-5 simple-clickable-1`}
                  tooltip='Add Item'
                  onClick={handleOpenContentItemModal}
                />
                <div
                  className={`cursor-pointer  ${
                    hideConsumed ? 'simple-clickable-2' : 'simple-clickable-1'
                  }`}
                  onClick={() =>
                    dispatch(
                      fetchContentItems({
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
            </div>
            <ContentItemSearch />
          </div>
        </Table.THead>
      );
    };

    return (
      <Table.TContainer>
        {renderUtilityPanel()}
        <Table.TBody>
          <LoadingOverlay loading={isLoading} />
          {contentItems.map((contentItem, i) => (
            <ContentItemRow
              key={contentItem.id}
              contentItem={contentItem}
              source={source}
              selected={selectedIndexes.includes(i)}
              onSelect={(shiftKey: boolean) => handleSelect(i, shiftKey)}
              showSelectBox={isSelectMode}
            />
          ))}
        </Table.TBody>
      </Table.TContainer>
    );
  }
);
