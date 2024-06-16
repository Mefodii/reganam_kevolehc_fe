import React, { PropsWithChildren, useCallback } from 'react';
import { removeDrag, setDrag } from '../../redux/dragAndDropSlice';
import { useAppDispatch } from '../../hooks';

export type DragProps = PropsWithChildren<{
  draggable: boolean;
  accessGroup: DragAndDrop.AccessGroup;
  onDragStart?: (
    e: React.DragEvent<HTMLDivElement>,
    data: Required<DragAndDrop.Data>
  ) => void;
  onDragEnd?: (e: React.DragEvent<HTMLDivElement>) => void;
  item: DragAndDrop.Item;
  type: DragAndDrop.Type;
}>;

const Drag = ({
  item,
  type,
  draggable,
  accessGroup,
  children,
  onDragStart = () => {},
  onDragEnd = () => {},
}: DragProps) => {
  const dispatch = useAppDispatch();

  const onInnnerDragStart: React.DragEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      const dndData = { item, type, copy: e.ctrlKey, accessGroup };
      dispatch(setDrag(dndData));
      onDragStart(e, dndData);
    },
    [item, type, accessGroup, dispatch, onDragStart]
  );

  const onInnerDragEnd: React.DragEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      dispatch(removeDrag());
      onDragEnd && onDragEnd(e);
    },
    [dispatch, onDragEnd]
  );

  return (
    <div
      draggable={draggable}
      onDragStart={onInnnerDragStart}
      onDragEnd={onInnerDragEnd}
    >
      {children}
    </div>
  );
};

export default React.memo(Drag);
