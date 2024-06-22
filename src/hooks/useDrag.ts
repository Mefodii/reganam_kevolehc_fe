import { useCallback, useContext, useMemo, useState } from 'react';
import { DnDContext } from '../context';
import { DnDProps } from '../context/DnD';

export const useDrag = <T>(details: T) => {
  const { setDrag, removeDrag } = useContext<DnDProps<T>>(DnDContext);
  const [dragState, setDragState] = useState({
    isDragged: false,
    isCopying: false,
  });

  const handleDragStart = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      const copy = e.ctrlKey;
      setDrag({ copy, details });
      setDragState({ isDragged: true, isCopying: copy });
    },
    [details, setDrag]
  );

  const handleDragEnd = useCallback(() => {
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
