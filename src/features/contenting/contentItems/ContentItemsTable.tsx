import React, { useEffect, useState } from 'react';
import ContentItemRow from './ContentItemRow';
import { LoadingOverlay, Pagination, Table } from '../../../components/generic';
import {
  selectIsAPIPending,
  updateContentItems,
  deleteContentItems,
  fetchContentItems,
} from './contentItemsSlice';
import {
  useAppDispatch,
  useAppSelector,
  useListSelect,
  useModal,
} from '../../../hooks';
import { Checkbox } from '../../../components/form';
import {
  SVGClipboardDocEmpty,
  SVGCross,
  SVGEye,
  SVGEyeClosed,
  SVGEyeSlash,
  SVGYoutube,
} from '../../../components/svg';
import {
  filterSelectedItems,
  joinByNewline,
  saveToClipboard,
} from '../../../util/functions';
import { toYTPlaylist } from '../../helpers/transformers/playlistToYoutubePlaylist';
import { UtilityPanelIcon } from '../../../components/buttons';

type ContentItemsTableProps = {
  contentItems: Model.ContentItemDM[];
  pageInfo: PageInfo<QParams.ContentItem>;
};

const ContentItemsTable: React.FC<ContentItemsTableProps> = ({
  contentItems,
  pageInfo,
}) => {
  const hideConsumed: boolean = Boolean(pageInfo.currentParams?.hideConsumed);
  const dispatch = useAppDispatch();

  const isLoading = useAppSelector(selectIsAPIPending);
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedIndexes, handleSelect, resetSelection] = useListSelect();

  const { openConfirmationModal } = useModal();

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
    dispatch(updateContentItems(newItems)).then(
      () => hideConsumed && resetSelection()
    );
  };

  const handleDelete = () => {
    const selectedItems = filterSelectedItems(contentItems, selectedIndexes);
    openConfirmationModal({
      title: `Delete ${selectedItems.length} items?`,
      onConfirm: () => {
        dispatch(deleteContentItems(selectedItems)).then(() =>
          resetSelection()
        );
      },
    });
  };

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
              <UtilityPanelIcon
                SVGComponent={SVGEye}
                isActive={isSelectMode}
                tooltip={'Set Consumed'}
                onClick={() => handleSetConsumed(true)}
              />
              <UtilityPanelIcon
                SVGComponent={SVGEyeSlash}
                isActive={isSelectMode}
                tooltip={'Set Not Consumed'}
                onClick={() => handleSetConsumed(false)}
              />
              <UtilityPanelIcon
                SVGComponent={SVGClipboardDocEmpty}
                isActive={isSelectMode}
                tooltip={'Copy items as text'}
              />
              <UtilityPanelIcon
                SVGComponent={SVGYoutube}
                isActive={isSelectMode}
                tooltip={'Copy as YT Playlist'}
                onClick={handleCopyAsYTPlaylist}
              />
              <UtilityPanelIcon
                SVGComponent={SVGCross}
                isActive={isSelectMode}
                tooltip={'Delete'}
                onClick={handleDelete}
              />
            </div>
            <div className='pt-2 text-sm text-active-1/70'>{`${selectedIndexes.length}: Selected`}</div>
          </div>
        </div>
        <div className='flex w-1/3'>
          <Pagination pageInfo={pageInfo} action={fetchContentItems} />
        </div>
        <div className={`flex w-1/3 justify-end`}>
          <div
            className={`cursor-pointer ${
              hideConsumed ? 'text-active-2' : 'text-text-1'
            }`}
            onClick={() =>
              dispatch(
                fetchContentItems({
                  ...pageInfo.currentParams,
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
      <Table.TBody>
        <LoadingOverlay loading={isLoading} />
        {contentItems.map((contentItem, i) => (
          <ContentItemRow
            key={contentItem.id}
            contentItem={contentItem}
            selected={selectedIndexes.includes(i)}
            onSelect={(shiftKey: boolean) => handleSelect(i, shiftKey)}
            showSelectBox={isSelectMode}
          />
        ))}
      </Table.TBody>
    </Table.TContainer>
  );
};

export default React.memo(ContentItemsTable);
