import { DropEvents, DropState, UseDropProps, useDrop } from './useDrop';
import { DragEvents, DragState, useDrag } from './useDrag';

// TODO: (H) - move TS to d.ts for this / Drag / Drop

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
  const { dropEvents, ...dropState } = useDrop<E, T>({
    ...dropProps,
    accepted: dropProps.accepted ? dropProps.accepted : type,
  });

  return {
    ...dragState,
    ...dropState,
    dndEvents: {
      ...dragEvents,
      ...dropEvents,
    },
  };
};
