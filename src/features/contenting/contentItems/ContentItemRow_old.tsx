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
import { useAppDispatch, useDragAndDrop, useModal } from '../../../hooks';
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
import { DragAndDrop } from '../../../components/dragAndDrop';
import { Text } from '../../../components/form';
import ContentItemForm from './ContentItemForm';
import { contentItem as model } from '../../../models';

type ContentItemRowProps = {
  contentItem: Model.ContentItemDM;
  selected?: boolean;
  onSelect?: (shiftKey: boolean) => void;
  showSelectBox?: boolean;
};

const validateDragOver = (
  dndData: DragAndDrop.Data,
  contentItem: Model.ContentItemDM
): Model.ContentItemDM | undefined => {
  const { details, copy } = dndData;

  if (!details) return undefined;
  if (details.type !== 'CONTENT_ITEM') return undefined;
  if (details.item !== contentItem) return details.item;
  if (copy) return details.item;

  return undefined;
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

  // TODO: (H) probably can be extract in a custom hook (field, error and related functions from below)
  const [isEditTitle, setIsEditTitle] = useState(false);
  const [isTitleError, setIsTitleError] = useState(false);

  const [isMouseOver, setIsMouseOver] = useState(false);
  const [titleForm, setTitleForm] = useState(contentItem.title);

  const [draggable, setDraggable] = useState(false);
  const {
    dragged,
    dragCopy,
    dragOver,
    onDragStart,
    onDragEnd,
    onDragEnter,
    onDragLeave,
    onDragOver,
    onDrop,
  } = useDragAndDrop();
  const [insertBefore, setInsertBefore] = useState(false);

  const dispatch = useAppDispatch();
  const { title, position, published_at, consumed, url, item_id } = contentItem;

  const handleDragEnter = (dndData: DragAndDrop.Data) => {
    const draggedItem = validateDragOver(dndData, contentItem);
    if (!draggedItem) return;

    onDragEnter(dndData);
    setInsertBefore(draggedItem.position > contentItem.position);
  };

  const handleDrop = (dndData: DragAndDrop.Data) => {
    if (!dragOver) return;
    onDrop();

    const draggedItem = validateDragOver(dndData, contentItem);
    if (!draggedItem) return;

    const position =
      dndData.copy && !insertBefore
        ? contentItem.position + 1
        : contentItem.position;
    const newContentItem = { ...draggedItem, position };
    const action = dndData.copy ? createContentItem : updateContentItem;

    dispatch(action(newContentItem));
  };

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
    <DragAndDrop
      draggable={draggable}
      details={model.asDnDDetails(contentItem)}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragEnter={handleDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={handleDrop}
    >
      <div
        className={`flex ${insertBefore ? 'flex-col' : 'flex-col-reverse'} ${
          showSelectBox ? 'noselect' : ''
        }`}
      >
        <ItemPlaceholder show={dragOver} className='h-12 p-2 bg-active-1/5' />
        <Table.TRow
          className={`${dragged && 'border border-active-1/50'} ${
            dragged && dragCopy && 'brightness-125'
          } ${dragged && !dragCopy && 'opacity-30'}`}
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
          <div className='w-12 text-lg text-text-1/10 text-right'>
            {position}
          </div>
        </Table.TRow>
      </div>
    </DragAndDrop>
  );
};

export default React.memo(ContentItemRow);
