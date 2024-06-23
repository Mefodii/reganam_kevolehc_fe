import React, { useEffect, useRef, useState } from 'react';
import { toLocalDatetime } from '../../../util/datetime';
import {
  SVGBox,
  SVGBoxChecked,
  SVGCalendar,
  SVGCross,
  SVGFingerprint,
  SVGLink,
  SVGPencil,
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

type ContentItemRowProps = {
  contentItem: Model.ContentItemDM;
  selected?: boolean;
  onSelect?: (shiftKey: boolean) => void;
  showSelectBox?: boolean;
};

// TODO: (H) check if it is possible to embed youtube player
const ContentItemRow: React.FC<ContentItemRowProps> = ({
  contentItem,
  selected = false,
  showSelectBox = false,
  onSelect = () => {},
}) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const { openModal, openConfirmationModal, closeModal } = useModal();

  // TODO: (H) probably can be extract in a custom hook (isEditTitle field, error and related functions from below)
  const [isEditTitle, setIsEditTitle] = useState(false);
  const [isTitleError, setIsTitleError] = useState(false);

  const [isMouseOver, setIsMouseOver] = useState(false);
  const [titleForm, setTitleForm] = useState(contentItem.title);

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
        formProps={{ formMode: 'UPDATE', contentItem }}
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
          className='row-icon cursor-pointer'
          tooltip='Edit'
          onClick={handleOpenContentItemModal}
        />
        <SVGCross
          className='row-icon cursor-pointer hover:text-error-1'
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

  // TODO: (M) - Context menu: https://blog.logrocket.com/creating-react-context-menu/
  return (
    <div
      className={`flex ${insertBefore ? 'flex-col' : 'flex-col-reverse'} ${
        showSelectBox ? 'noselect' : ''
      }`}
      draggable={draggable}
      {...dndEvents}
    >
      <ItemPlaceholder show={isDragOver} className='h-12 p-2 bg-active-1/5' />
      <Table.TRow
        className={`${isDragged && 'border border-active-1/50'} ${
          isDragged && isCopying && 'brightness-125'
        } ${isDragged && !isCopying && 'opacity-30'}`}
        onMouseEnter={() => setIsMouseOver(true)}
        onMouseLeave={() => setIsMouseOver(false)}
      >
        {showSelectBox && selected && (
          <SVGBoxChecked
            className='w-4 mr-4 text-active-1/80'
            onClick={(e) => onSelect(e.shiftKey)}
          />
        )}
        {showSelectBox && !selected && (
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
        <div className='w-12 text-lg text-text-1/10 text-right'>{position}</div>
      </Table.TRow>
    </div>
  );
};

export default React.memo(ContentItemRow);
