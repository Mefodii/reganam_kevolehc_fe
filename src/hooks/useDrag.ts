import { useCallback, useContext, useMemo, useState } from 'react';
import { DnDContext } from '../context';
import { DnDProps } from '../context/DnD';

export type DragState = {
  isDragged: boolean;
  isCopying: boolean;
};

export type DragEvents<E extends HTMLElement> = {
  onDragStart: React.DragEventHandler<E>;
  onDragEnd: React.DragEventHandler<E>;
};

export type UseDragReturn<E extends HTMLElement> = DragState & {
  dragEvents: DragEvents<E>;
};

export const useDrag = <E extends HTMLElement, T = unknown>(
  type: string,
  item: T
): UseDragReturn<E> => {
  const { setDrag, removeDrag } = useContext<DnDProps<T, E>>(DnDContext);
  const [dragState, setDragState] = useState<DragState>({
    isDragged: false,
    isCopying: false,
  });

  const handleDragStart: React.DragEventHandler<E> = useCallback(
    (e) => {
      const copy = e.ctrlKey;
      setDrag({ copy, type, item });
      setDragState({ isDragged: true, isCopying: copy });
    },
    [type, item, setDrag]
  );

  const handleDragEnd: React.DragEventHandler<E> = useCallback(() => {
    removeDrag();
    setDragState({ isDragged: false, isCopying: false });
  }, [removeDrag]);

  const dragEvents = useMemo(
    () => ({
      onDragStart: handleDragStart,
      onDragEnd: handleDragEnd,
    }),
    [handleDragStart, handleDragEnd]
  );

  return {
    ...dragState,
    dragEvents,
  };
};
