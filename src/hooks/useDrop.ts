import { useCallback, useContext, useMemo, useState } from 'react';
import { DnDContext } from '../components/dragAndDrop/Drag2';

type UseDropProps = {
  onDragOver?: (data: DragAndDrop.Data) => void;
  onDragEnter?: (data: DragAndDrop.Data) => void;
  onDragLeave?: (data: DragAndDrop.Data) => void;
  onDrop?: (data: DragAndDrop.Data) => void;
};

export const useDrop = ({
  onDragOver,
  onDragEnter,
  onDragLeave,
  onDrop,
}: UseDropProps) => {
  const { data } = useContext(DnDContext);
  const [, setDragCounter] = useState(0);

  const handleDragEnter = useCallback(
    (data: DragAndDrop.Data) => {
      onDragEnter && onDragEnter(data);
    },
    [onDragEnter]
  );

  const handleDragLeave = useCallback(
    (data: DragAndDrop.Data) => {
      onDragLeave && onDragLeave(data);
    },
    [onDragLeave]
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (!data) return;
      onDragOver && onDragOver(data);
    },
    [onDragOver, data]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDragCounter(0);
      onDrop && onDrop(data);
    },
    [data, onDrop]
  );

  const handleDragPass = useCallback(
    (mod: number) => {
      setDragCounter((prevCounter) => {
        const newCounter = prevCounter + mod;

        if (prevCounter === 0 && newCounter === 1) {
          handleDragEnter(data);
        }
        if (prevCounter === 1 && newCounter === 0) {
          handleDragLeave(data);
        }

        return newCounter;
      });
    },
    [handleDragEnter, handleDragLeave, data]
  );

  const dropEvents = useMemo(
    () => ({
      onDragEnter: () => handleDragPass(1),
      onDragLeave: () => handleDragPass(-1),
      onDragOver: handleDragOver,
      onDrop: handleDrop,
    }),
    [handleDragPass, handleDragOver, handleDrop]
  );

  return dropEvents;
};
