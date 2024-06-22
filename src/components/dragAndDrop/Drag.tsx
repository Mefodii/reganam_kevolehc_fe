import React, { PropsWithChildren, useCallback } from 'react';
import { removeDrag, setDrag } from '../../redux/dragAndDropSlice';
import { useAppDispatch } from '../../hooks';

export type DragProps = PropsWithChildren<{
  draggable: boolean;
  details: DragAndDrop.Details;
  onDragStart?: (
    e: React.DragEvent<HTMLDivElement>,
    data: Required<DragAndDrop.Data>
  ) => void;
  onDragEnd?: (e: React.DragEvent<HTMLDivElement>) => void;
}>;

const Drag = ({
  draggable,
  details,
  children,
  onDragStart = () => {},
  onDragEnd = () => {},
}: DragProps) => {
  const dispatch = useAppDispatch();

  const onInnnerDragStart: React.DragEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      const dndData = { copy: e.ctrlKey, details };
      dispatch(setDrag(dndData));
      onDragStart(e, dndData);
    },
    [details, dispatch, onDragStart]
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
