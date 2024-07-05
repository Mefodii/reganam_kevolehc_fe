import { DropEvents, DropState, UseDropProps, useDrop } from './useDrop';
import { DragEvents, DragState, useDrag } from './useDrag';
import { useMemo } from 'react';

export type DnDEvents<E extends HTMLElement> = {
  onDragStart: React.DragEventHandler<E>;
  onDragEnd: React.DragEventHandler<E>;
};
export type UseDnDReturn<E extends HTMLElement> = DragState &
  DropState & {
    dndEvents: DragEvents<E> & DropEvents<E>;
  };

export const useDnD = <E extends HTMLElement, T = unknown>(
  type: string,
  item: T,
  dropProps: UseDropProps<E, T>
): UseDnDReturn<E> => {
  const { dragEvents, ...dragState } = useDrag<E, T>(type, item);

  const props = useMemo(
    () => ({
      ...dropProps,
      accepted: dropProps.accepted ? dropProps.accepted : type,
    }),
    [dropProps, type]
  );
  const { dropEvents, ...dropState } = useDrop<E, T>(props);

  const dndEvents = useMemo(
    () => ({
      ...dragEvents,
      ...dropEvents,
    }),
    [dragEvents, dropEvents]
  );

  return {
    ...dragState,
    ...dropState,
    dndEvents,
  };
};
