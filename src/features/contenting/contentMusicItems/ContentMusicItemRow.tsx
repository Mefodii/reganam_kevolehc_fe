import React, { useMemo, useState } from 'react';
import { toLocalDatetime } from '../../../util/datetime';
import {
  SVGCalendar,
  SVGCross,
  SVGLink,
  SVGListBullet,
  SVGMinus,
  SVGPencil,
} from '../../../components/svg';
import { contentMusicItem as model } from '../../../models';
import ContentTrackRow from '../contentTracks/ContentTrackRow';
import {
  useAppDispatch,
  useContextMenu,
  useDnD,
  useModal,
} from '../../../hooks';
import { ContentMusicContextMenu } from '../../../components/contextMenu';
import {
  DragDots,
  ItemPlaceholder,
  LED,
  Table,
} from '../../../components/generic';
import { DnDTypes } from '../../../util/constants';
import {
  createContentMusicItem,
  deleteContentMusicItem,
  updateContentMusicItem,
} from './contentMusicItemsSlice';
import ContentMusicItemForm from './ContentMusicItemForm';
import { UseDropProps } from '../../../hooks/useDrop';

type ContentMusicItemRowProps = {
  contentMusicItem: Model.ContentMusicItemDM;
};
const ContentMusicItemRow: React.FC<ContentMusicItemRowProps> = ({
  contentMusicItem,
}) => {
  const { title, position, published_at, type, tracks, url, parsed } =
    contentMusicItem;

  const { openModal, openConfirmationModal, closeModal } = useModal();

  const dispatch = useAppDispatch();
  const { showContext, coords, onContextMenu } = useContextMenu();
  const [isMouseOver, setIsMouseOver] = useState(false);

  const [insertBefore, setInsertBefore] = useState(false);
  const [draggable, setDraggable] = useState(false);

  const dropProps: UseDropProps<HTMLDivElement, Model.ContentMusicItemDM> =
    useMemo(
      () => ({
        extraValidation: (e, item, copy) => {
          if (item.content_list !== contentMusicItem.content_list) return false;
          if (item !== contentMusicItem) return true;
          return copy;
        },
        onDragEnter: (e, item) =>
          setInsertBefore(item.position > contentMusicItem.position),
        onDrop: (e, item, copy) => {
          const action = copy ? createContentMusicItem : updateContentMusicItem;
          const position =
            contentMusicItem.position + (copy && !insertBefore ? 1 : 0);
          dispatch(action({ ...item, position }));
        },
      }),
      [dispatch, contentMusicItem, insertBefore]
    );

  const { isDragged, isCopying, isDragOver, dndEvents } = useDnD<
    HTMLDivElement,
    Model.ContentMusicItemDM
  >(DnDTypes.CONTENT_MUSIC_ITEM, contentMusicItem, dropProps);

  const handleToggleParsed = () => {
    dispatch(updateContentMusicItem({ ...contentMusicItem, parsed: !parsed }));
  };

  const handleOpenContentItemModal = () => {
    openModal(
      <ContentMusicItemForm
        formProps={{ formMode: 'UPDATE', item: contentMusicItem }}
        onSuccess={closeModal}
      />
    );
  };

  const handleDeleteContentMusicItem = () => {
    openConfirmationModal({
      title: 'Delete Item?',
      onConfirm: () => dispatch(deleteContentMusicItem(contentMusicItem)),
    });
  };

  const renderTypeSVG = () => {
    if (model.isPlaylist(contentMusicItem)) {
      return <SVGListBullet className='w-5 text-active-2/80' tooltip={type} />;
    }
    if (model.isSingle(contentMusicItem)) {
      return <SVGMinus className='w-5 text-active-2/80' tooltip={type} />;
    }
    if (model.isNotMusic(contentMusicItem)) {
      return <SVGCross className='w-5 text-error-1/80' tooltip={type} />;
    }
  };

  const renderIcons = () => {
    return (
      <div className='flex space-x-2 divide-x divide-active-1/20 justify-end mr-4'>
        {url && (
          <a href={url} target='_blank' rel='noreferrer'>
            <SVGLink
              className='w-4 ml-2 text-text-1/30 hover:text-text-1'
              tooltip={url}
            />
          </a>
        )}
        <SVGCalendar
          className='w-4 ml-2 text-text-1/30 hover:text-text-1'
          tooltip={toLocalDatetime(published_at)}
        />
        <SVGPencil
          className='row-icon'
          tooltip='Edit'
          onClick={handleOpenContentItemModal}
        />
        <SVGCross
          className='row-icon hover:text-error-1'
          tooltip='Delete'
          onClick={handleDeleteContentMusicItem}
        />
      </div>
    );
  };

  return (
    <div
      className={`flex ${insertBefore ? 'flex-col' : 'flex-col-reverse'}`}
      draggable={draggable}
      {...dndEvents}
    >
      <ItemPlaceholder show={isDragOver} className='h-12 p-2 bg-active-1/5' />
      <div className='flex flex-col'>
        <Table.TRow
          className={`group ${isDragged && 'border border-active-1/50'} ${
            isDragged && isCopying && 'brightness-125'
          } ${isDragged && !isCopying && 'opacity-30'}`}
          onMouseEnter={() => setIsMouseOver(true)}
          onMouseLeave={() => setIsMouseOver(false)}
        >
          <DragDots
            show={isMouseOver}
            onMouseEnter={() => setDraggable(true)}
            onMouseLeave={() => setDraggable(false)}
          />
          <div className={`w-10 cursor-pointer`} onClick={handleToggleParsed}>
            <LED on={true} color={parsed ? 'Green' : 'Yellow'} />
          </div>
          <div className='w-10 text-text-1/20' onContextMenu={onContextMenu}>
            {renderTypeSVG()}
          </div>
          {showContext && (
            <ContentMusicContextMenu
              coords={coords}
              onClick={(type) => console.log(type)}
            />
          )}
          <div className='flex-3'>{title}</div>
          <div
            className={`flex-1 ${isMouseOver ? 'opacity-100' : 'opacity-0'}`}
          >
            {renderIcons()}
          </div>
          <div className='w-12 text-lg text-text-1/10 group-hover:text-text-1/70 text-right'>
            {position}
          </div>
        </Table.TRow>
        <div className={`${tracks.length > 0 ? 'pb-3' : ''}`}>
          {tracks.map((track, i) => (
            <ContentTrackRow contentTrack={track} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(ContentMusicItemRow) as typeof ContentMusicItemRow;
