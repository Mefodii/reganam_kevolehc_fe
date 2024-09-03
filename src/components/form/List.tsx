import React, { useCallback, useMemo, useState } from 'react';
import { useDnD } from '../../hooks';
import { useDrop, UseDropProps } from '../../hooks/useDrop';
import { DragDots } from '../generic';
import { SVGCross } from '../svg';
import { InputContainer, InputContainerProps } from './InputContainer';

export type ListItemProps<T> = InputContainerProps & {
  listItem: T;
  position: number;
  dropType: string;
  itemDisplay: (item: T, i?: number) => string;
  insertItem: (item: T, position: number) => void;
  removeItem: (item: T) => void;
};

const ListItem = <T,>({
  listItem,
  position,
  dropType,
  itemDisplay,
  insertItem,
  removeItem,
}: ListItemProps<T>) => {
  const [draggable, setDraggable] = useState(false);
  const [isMouseOver, setIsMouseOver] = useState(false);

  const dropProps: UseDropProps<HTMLDivElement, T> = useMemo(
    () => ({
      extraValidation: (e, item) => item !== listItem,
      onDrop: (e, item) => {
        insertItem(item, position);
      },
    }),
    [insertItem, position, listItem]
  );

  const { isDragged, isDragOver, dndEvents } = useDnD<HTMLDivElement, T>(
    dropType,
    listItem,
    dropProps
  );

  return (
    <div
      className='flex items-center'
      {...dndEvents}
      draggable={draggable}
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
    >
      {isDragOver && (
        <div className='w-2 h-6 border border-dashed border-active-1 mr-2' />
      )}
      <div
        className={`border ${
          isDragged ? 'opacity-40' : 'opacity-100'
        } border-active-1 text-active-1 rounded-sm pl-2 flex justify-between items-center`}
      >
        <DragDots
          show={isMouseOver}
          onMouseEnter={() => setDraggable(true)}
          onMouseLeave={() => setDraggable(false)}
        />
        {itemDisplay(listItem, position)}
        <SVGCross className='row-icon' onClick={() => removeItem(listItem)} />
      </div>
    </div>
  );
};

export type ListProps<T> = InputContainerProps & {
  name: string;
  items: T[];
  dropType: string;
  itemDisplay: (item: T, i?: number) => string;
  className?: string;
  containerClassName?: string;
  onChange: (e: Form.ChangeEvent, payload: Form.Payload<T[]>) => void;
};

const ListBase = <T,>({
  label,
  error,
  name,
  items,
  dropType,
  className,
  containerClassName,
  itemDisplay,
  onChange,
}: ListProps<T>) => {
  const insertItem = useCallback(
    (item: T, position: number) => {
      let value = [...items];
      let newPosition = position;
      if (items.includes(item)) {
        const itemPosition = items.findIndex((v) => v === item);
        if (itemPosition === newPosition || itemPosition + 1 === newPosition)
          return;

        value = items.filter((i) => i !== item);
        if (newPosition > itemPosition) {
          newPosition--;
        }
      }

      value.splice(newPosition, 0, item);
      onChange(undefined, { name, value });
    },
    [items, name, onChange]
  );

  const { isDragOver, dropEvents } = useDrop({ accepted: dropType });

  const dropProps: UseDropProps<HTMLDivElement, T> = useMemo(
    () => ({
      accepted: dropType,
      onDrop: (e, item) => {
        insertItem(item, items.length);
      },
    }),
    [dropType, insertItem, items.length]
  );
  const {
    isDragOver: isPlaceholderDragOver,
    dropEvents: placeholderDropEvents,
  } = useDrop(dropProps);

  const removeItem = (item: T) => {
    const newItems = items.filter((i) => i !== item);
    onChange(undefined, { name, value: newItems });
  };

  const renderInput = () => {
    return (
      <div
        className={`flex flex-wrap border border-dashed border-active-1/0 justify-start items-center space-x-2 ${
          isDragOver && 'border-active-1/30 bg-theme-4'
        } ${className}`}
        {...dropEvents}
      >
        {items.map((item, i) => (
          <ListItem
            key={i}
            dropType={dropType}
            position={i}
            listItem={item}
            itemDisplay={(item, i) => itemDisplay(item, i)}
            insertItem={(item, position) => insertItem(item, position)}
            removeItem={(item) => removeItem(item)}
          />
        ))}
        <div className='flex flex-1'>
          {isPlaceholderDragOver && (
            <div className='w-2 h-6 border border-dashed border-active-1 mr-2' />
          )}
          <div
            className={`h-6 flex-1 border opacity-0`}
            {...placeholderDropEvents}
          ></div>
        </div>
      </div>
    );
  };

  return (
    <InputContainer
      label={label}
      error={error}
      className={` ${containerClassName}`}
    >
      {renderInput()}
    </InputContainer>
  );
};

export const List = React.memo(ListBase) as typeof ListBase;
