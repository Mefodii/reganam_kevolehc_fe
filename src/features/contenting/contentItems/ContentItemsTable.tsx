import React, { useEffect, useMemo, useState } from 'react';
import ContentItemRow from './ContentItemRow';
import { LoadingOverlay } from '../../../components/generic';
import {
  isAPIPending,
  updateContentItems,
  deleteContentItems,
} from './contentItemsSlice';
import { useAppDispatch, useAppSelector, useListSelect } from '../../../hooks';
import { SingleSelect } from '../../../components/form';
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
};

const ContentItemsTable: React.FC<ContentItemsTableProps> = ({
  contentItems,
}) => {
  const dispatch = useAppDispatch();

  const isLoading = useAppSelector(isAPIPending);
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [showConsumed, setShowConsumed] = useState(true);
  const [selectedIndexes, handleSelect, resetSelection] = useListSelect();

  const contentItemsFiltered = useMemo(() => {
    if (showConsumed) return contentItems;

    return contentItems.filter((contentItem) => !contentItem.consumed);
  }, [contentItems, showConsumed]);

  const handleSetConsumed = (consumed: boolean) => {
    const selectedItems = filterSelectedItems(
      contentItemsFiltered,
      selectedIndexes
    );
    if (selectedItems.every((item) => item.consumed === consumed)) {
      return;
    }

    const contentItems = selectedItems.map((contentItem) => ({
      ...contentItem,
      consumed,
    }));
    dispatch(updateContentItems(contentItems));
  };

  const handleDelete = () => {
    dispatch(
      deleteContentItems(
        filterSelectedItems(contentItemsFiltered, selectedIndexes)
      )
    );
  };

  const handleCopyAsYTPlaylist = () => {
    const selectedItems = filterSelectedItems(
      contentItemsFiltered,
      selectedIndexes
    );
    if (!selectedItems) return;

    const playlists = toYTPlaylist(selectedItems.map((item) => item.item_id));
    saveToClipboard(
      playlists.length === 1 ? playlists[0] : joinByNewline(playlists)
    );
  };

  useEffect(() => {
    resetSelection();
  }, [showConsumed, isSelectMode, resetSelection]);

  const renderUtilityPanel = () => {
    return (
      <div className='m-5 flex items-center justify-between text-lg font-bold border-b-2 border-active-1/80 mb-2 pb-3 select-none'>
        <div className='flex items-center'>
          <SingleSelect
            className='rounded-none px-2 border-opacity-70'
            name='showPosters'
            text='Select Mode'
            value={isSelectMode}
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
        {showConsumed ? (
          <SVGEye
            className={`w-5 text-text-1 cursor-pointer`}
            onClick={() => setShowConsumed(false)}
            tooltip='Hide Consumed'
          />
        ) : (
          <SVGEyeClosed
            className={`w-5 text-active-2 cursor-pointer`}
            onClick={() => setShowConsumed(true)}
            tooltip='Show Consumed'
          />
        )}
      </div>
    );
  };

  return (
    <div className='bg-theme-1 border border-theme-3 rounded-lg shadow-2xl shadow-active-1/5'>
      {renderUtilityPanel()}
      <div className='relative divide-y divide-active-1/10'>
        <LoadingOverlay loading={isLoading} />
        {contentItemsFiltered.map((contentItem, i) => (
          <ContentItemRow
            key={contentItem.id}
            contentItem={contentItem}
            selected={selectedIndexes.includes(i)}
            onSelect={(shiftKey: boolean) => handleSelect(i, shiftKey)}
            showSelectBox={isSelectMode}
          />
        ))}
      </div>
    </div>
  );
};

export default ContentItemsTable;
