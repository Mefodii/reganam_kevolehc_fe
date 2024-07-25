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
import TrackStatusPanel from '../../listening/tracks/TrackStatusPanel';
import { DownloadStatus } from '../../../api/api-utils';

type ContentMusicItemRowProps = {
  contentMusicItem: Model.ContentMusicItemDM;
};
const ContentMusicItemRow: React.FC<ContentMusicItemRowProps> = ({
  contentMusicItem,
}) => {
  const {
    id,
    title,
    position,
    published_at,
    type,
    tracks,
    url,
    parsed,
    download_status,
  } = contentMusicItem;

  const { openModal, openConfirmationModal, closeModal } = useModal();
  const [isSingle, isPlaylist, isNotMusic, isUnknown] = useMemo(
    () => [
      model.isSingle(contentMusicItem),
      model.isPlaylist(contentMusicItem),
      model.isNotMusic(contentMusicItem),
      model.isUnknown(contentMusicItem),
    ],
    [contentMusicItem]
  );

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
    if (isPlaylist) {
      return <SVGListBullet className='w-5 text-active-2/80' tooltip={type} />;
    }
    if (isSingle) {
      return <SVGMinus className='w-5 text-active-2/80' tooltip={type} />;
    }
    if (isNotMusic) {
      return <SVGCross className='w-5 text-error-1/80' tooltip={type} />;
    }
    if (isUnknown) {
      return <div className='w-5 text-warning-1/80 text-center'>{'?'}</div>;
    }
  };

  const renderIcons = () => {
    return (
      <div className='flex justify-end'>
        {url && (
          <a href={url} target='_blank' rel='noreferrer'>
            <SVGLink className='row-icon' tooltip={url} />
          </a>
        )}
        <SVGCalendar
          className='row-icon'
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

  const renderTitle = useMemo(() => {
    if (isSingle) {
      if (!tracks || !tracks[0]?.track) {
        throw new Error(
          `Single items are expected to have one track. Item: ${id}/${title}`
        );
      }

      return <div>{tracks[0].track.full_name}</div>;
    }
    return <div>{title}</div>;
  }, [id, title, isSingle, tracks]);

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
          <div
            className={`flex-3 ${
              [DownloadStatus.MISSING, DownloadStatus.UNABLE].includes(
                download_status
              ) && 'text-warning-1'
            }`}
          >
            {renderTitle}
          </div>
          <div
            className={`flex-1 ${isMouseOver ? 'opacity-100' : 'opacity-0'}`}
          >
            {renderIcons()}
          </div>

          <div className='w-36'>
            {isSingle && <TrackStatusPanel track={tracks[0].track!} />}
          </div>
          <div className='w-12 text-lg text-text-1/10 group-hover:text-text-1/70 text-right'>
            {position}
          </div>
        </Table.TRow>
        {isPlaylist && (
          <div className={`${tracks.length > 0 ? 'pb-3' : ''}`}>
            {tracks.map((track, i) => (
              <ContentTrackRow contentTrack={track} key={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(ContentMusicItemRow) as typeof ContentMusicItemRow;
