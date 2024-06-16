import { useState } from 'react';

export const useDragAndDrop = () => {
  const [draggable, setDraggable] = useState(false);
  const [drag, setDrag] = useState({
    dragged: false,
    dragCopy: false,
    dragOver: false,
    dragOverCopy: false,
  });

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    dndData: DragAndDrop.Data
  ) => {
    setDrag({ ...drag, dragged: true, dragCopy: dndData.copy });
  };

  const handleDragEnd = () => {
    setDrag({ ...drag, dragged: false, dragCopy: false });
  };

  const handleDragEnter = (dndData: DragAndDrop.Data) => {
    setDrag({ ...drag, dragOver: true, dragOverCopy: dndData.copy });
  };

  const handleDragLeave = (dndData: DragAndDrop.Data) => {
    setDrag({ ...drag, dragOver: false, dragOverCopy: false });
  };

  const handleDragOver = (dndData: DragAndDrop.Data) => {};

  const handleDrop = () => {
    setDrag({ ...drag, dragOver: false });
  };

  return {
    draggable,
    dragged: drag.dragged,
    dragCopy: drag.dragCopy,
    dragOver: drag.dragOver,
    dragOverCopy: drag.dragOverCopy,
    onDragStart: handleDragStart,
    onDragEnd: handleDragEnd,
    onDragEnter: handleDragEnter,
    onDragLeave: handleDragLeave,
    onDragOver: handleDragOver,
    onDrop: handleDrop,
    setDraggable,
  };
};
