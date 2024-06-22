import { useCallback, useContext, useMemo, useState } from 'react';
import { DnDContext } from '../components/dragAndDrop/Drag2';

export const useDrag = <T extends DragAndDrop.Details>(details: T) => {
  const { setDrag, removeDrag } = useContext(DnDContext);
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
