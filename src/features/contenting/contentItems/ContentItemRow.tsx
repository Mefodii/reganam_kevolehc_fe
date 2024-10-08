import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ContentWatcherSource } from '../../../api/api-utils';
import { Text } from '../../../components/form';
import {
  DragDots,
  ItemPlaceholder,
  LED,
  Table,
  YouTubePlayer,
} from '../../../components/generic';
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
import { UseDropProps } from '../../../hooks/useDrop';
import { DnDTypes } from '../../../util/constants';
import { toLocalDatetime } from '../../../util/datetime';
import { ContentItemForm } from './ContentItemForm';
import {
  createContentItem,
  deleteContentItem,
  updateContentItem,
} from './contentItemsSlice';

type ContentItemRowProps = {
  contentItem: Model.ContentItemDM;
  source?: ContentWatcherSource;
  selected?: boolean;
  onSelect?: (shiftKey: boolean) => void;
  showSelectBox?: boolean;
};

export const ContentItemRow = React.memo(
  ({
    contentItem,
    source,
    selected = false,
    showSelectBox = false,
    onSelect,
  }: ContentItemRowProps) => {
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

    const dispatch = useAppDispatch();

    const dropProps: UseDropProps<HTMLDivElement, Model.ContentItemDM> =
      useMemo(
        () => ({
          extraValidation: (e, item, copy) => {
            if (item.content_list !== contentItem.content_list) return false;
            if (item !== contentItem) return true;
            return copy;
          },
          onDragEnter: (e, item) =>
            setInsertBefore(item.position > contentItem.position),
          onDrop: (e, item, copy) => {
            const action = copy ? createContentItem : updateContentItem;
            const position =
              contentItem.position + (copy && !insertBefore ? 1 : 0);
            dispatch(
              action({
                ...item,
                position,
              })
            );
          },
        }),
        [dispatch, contentItem, insertBefore]
      );

    const { isDragged, isCopying, isDragOver, dndEvents } = useDnD<
      HTMLDivElement,
      Model.ContentItemDM
    >(DnDTypes.CONTENT_ITEM, contentItem, dropProps);

    const { title, position, published_at, consumed, url, item_id } =
      contentItem;

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
        <YouTubePlayer
          title={contentItem.title}
          videoId={contentItem.item_id}
        />
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
            <div
              className={`w-10 cursor-pointer`}
              onClick={handleToggleConsumed}
            >
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
  }
);
