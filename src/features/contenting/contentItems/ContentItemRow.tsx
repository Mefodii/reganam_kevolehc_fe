import React, { useEffect, useMemo, useRef, useState } from 'react';
import { toLocalDatetime } from '../../../util/datetime';
import {
  SVGBox,
  SVGBoxChecked,
  SVGCalendar,
  SVGCross,
  SVGFingerprint,
  SVGLink,
  SVGPencil,
  SVGYoutube,
} from '../../../components/svg';
import { useAppDispatch, useDnD, useModal } from '../../../hooks';
import {
  createContentItem,
  deleteContentItem,
  updateContentItem,
} from './contentItemsSlice';
import {
  DragDots,
  ItemPlaceholder,
  LED,
  Table,
} from '../../../components/generic';
import { Text } from '../../../components/form';
import ContentItemForm from './ContentItemForm';
import { DnDTypes } from '../../../util/constants';
import { ContentWatcherSource } from '../../../api/api-utils';
import YouTubePlayer from '../../../components/generic/YouTubePlayer';

type ContentItemRowProps = {
  contentItem: Model.ContentItemDM;
  source: ContentWatcherSource;
  selected?: boolean;
  onSelect?: (shiftKey: boolean) => void;
  showSelectBox?: boolean;
};

const ContentItemRow: React.FC<ContentItemRowProps> = ({
  contentItem,
  source,
  selected = false,
  showSelectBox = false,
  onSelect,
}) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const { openModal, openConfirmationModal, closeModal } = useModal();

  // TODO: (H) probably can be extract in a custom hook (isEditTitle field, error and related functions from below)
  // TODO: (M) - in theory there is no need to update manually title if displaying from ContentWatcher
  const [isEditTitle, setIsEditTitle] = useState(false);
  const [isTitleError, setIsTitleError] = useState(false);

  const [isMouseOver, setIsMouseOver] = useState(false);
  const [titleForm, setTitleForm] = useState(contentItem.title);

  const [showPlayer, setShowPlayer] = useState(false);

  const [insertBefore, setInsertBefore] = useState(false);
  const [draggable, setDraggable] = useState(false);

  const { isDragged, isCopying, isDragOver, dndEvents } = useDnD<
    HTMLDivElement,
    Model.ContentItemDM
  >(DnDTypes.CONTENT_ITEM, contentItem, {
    accepted: DnDTypes.CONTENT_ITEM,
    extraValidation: (e, item, copy) => {
      // Note: personal opinion, this way looks more readable
      if (item.content_list !== contentItem.content_list) return false;
      if (item !== contentItem) return true;
      return copy;
    },
    onDragEnter: (e, item) =>
      setInsertBefore(item.position > contentItem.position),
    onDrop: handleDrop,
  });

  function handleDrop(
    e: React.DragEvent<HTMLDivElement>,
    item: Model.ContentItemDM,
    copy: boolean
  ) {
    const action = copy ? createContentItem : updateContentItem;
    dispatch(
      action({
        ...item,
        position:
          copy && !insertBefore
            ? contentItem.position + 1
            : contentItem.position,
      })
    );
  }

  const dispatch = useAppDispatch();
  const { title, position, published_at, consumed, url, item_id } = contentItem;

  const handleToggleConsumed = () => {
    // TODO: (L) - a bug here. when hideConsumed == true and it is last item on the last page,
    //  then it will refetch the same page which does not exist anymore
    dispatch(updateContentItem({ ...contentItem, consumed: !consumed }));
  };

  const handleTitleToggleEdit = () => {
    setTitleForm(title);
    setIsEditTitle(!isEditTitle);
  };

  const handleTitleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (
    e
  ) => {
    setIsTitleError(false);
    if (e.key === 'Enter') {
      saveTitleChanges();
    }
    if (e.key === 'Escape') {
      setIsEditTitle(false);
    }
  };

  const saveTitleChanges = () => {
    if (!titleForm) {
      setIsTitleError(true);
      return;
    }
    setIsEditTitle(false);
    if (title === titleForm) return;

    isTitleError && setIsTitleError(false);
    dispatch(updateContentItem({ ...contentItem, title: titleForm }));
  };

  const handleOpenContentItemModal = () => {
    openModal(
      <ContentItemForm
        formProps={{ formMode: 'UPDATE', item: contentItem }}
        onSuccess={closeModal}
      />
    );
  };

  const handleDeleteContentItem = () => {
    openConfirmationModal({
      title: 'Delete Item?',
      onConfirm: () => dispatch(deleteContentItem(contentItem)),
    });
  };

  useEffect(() => {
    if (isEditTitle) {
      titleRef.current?.focus();
    }
  }, [isEditTitle]);

  const renderIcons = () => {
    if (showSelectBox) return;

    // TODO: (L) - for SVGs add a prop "crossed" which will display a cross over it
    return (
      <div className='row-icons-container'>
        {source === ContentWatcherSource.YOUTUBE && (
          <SVGYoutube
            className='row-icon'
            tooltip='Open Player'
            onClick={() => setShowPlayer(!showPlayer)}
          />
        )}
        {url && (
          <a href={url} target='_blank' rel='noreferrer'>
            <SVGLink className='row-icon' tooltip={url} />
          </a>
        )}
        <SVGCalendar
          className='row-icon'
          tooltip={toLocalDatetime(published_at)}
        />
        <SVGFingerprint className='row-icon' tooltip={item_id} />
        <SVGPencil
          className='row-icon'
          tooltip='Edit'
          onClick={handleOpenContentItemModal}
        />
        <SVGCross
          className='row-icon hover:text-error-1'
          tooltip='Delete'
          onClick={handleDeleteContentItem}
        />
      </div>
    );
  };

  const renderTitleEdit = () => {
    return (
      <div
        className='flex-3 border-l border-active-1/30 pl-4'
        onDoubleClick={handleTitleToggleEdit}
      >
        {isEditTitle ? (
          <Text
            className={`border border-active-1/30 bg-theme-3/60 rounded-none ${
              isTitleError && 'border-error-1/80'
            }`}
            name='titleForm'
            value={titleForm}
            onChange={(e, payload) => setTitleForm(payload.value)}
            // TODO: (L)-  onblur is called when clicking on the SVG,
            // need to add a debounce to cancel blur if click was inside
            onBlur={() => setIsEditTitle(false)}
            onKeyDown={handleTitleKeyDown}
            simple
            ref={titleRef}
          />
        ) : (
          <div className={`${consumed ? 'opacity-50' : 'opacity-100'}`}>
            {title}
          </div>
        )}
      </div>
    );
  };

  const renderPlayer = useMemo(() => {
    return (
      <YouTubePlayer title={contentItem.title} videoId={contentItem.item_id} />
    );
  }, [contentItem.title, contentItem.item_id]);

  return (
    <div
      className={`flex ${insertBefore ? 'flex-col' : 'flex-col-reverse'} ${
        showSelectBox ? 'noselect' : ''
      }`}
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
          {showSelectBox && onSelect && selected && (
            <SVGBoxChecked
              className='w-4 mr-4 text-active-1/80'
              onClick={(e) => onSelect(e.shiftKey)}
            />
          )}
          {showSelectBox && onSelect && !selected && (
            <SVGBox
              className='w-4 mr-4 text-active-1/80'
              onClick={(e) => onSelect(e.shiftKey)}
            />
          )}
          {!showSelectBox && (
            <DragDots
              show={isMouseOver}
              onMouseEnter={() => setDraggable(true)}
              onMouseLeave={() => setDraggable(false)}
            />
          )}
          <div className={`w-10 cursor-pointer`} onClick={handleToggleConsumed}>
            <LED on={true} color={consumed ? 'Green' : 'Red'} />
          </div>
          {/* TODO: (M) - a custom compomnent which can be in edit or view mode */}
          {renderTitleEdit()}
          <div
            className={`flex-1 ${
              isMouseOver || isEditTitle ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {renderIcons()}
          </div>
          <div className='w-12 text-lg text-text-1/10 group-hover:text-text-1/70 text-right'>
            {position}
          </div>
        </Table.TRow>
        <div className='w-10/12 mx-auto'>{showPlayer && renderPlayer}</div>
      </div>
    </div>
  );
};

export default React.memo(ContentItemRow);
