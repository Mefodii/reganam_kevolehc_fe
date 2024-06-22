import { useCallback, useContext, useMemo, useState } from 'react';
import { DnDContext } from '../context';
import { DnDProps } from '../context/DnD';

export type UseDropProps<T> = {
  onDragOver?: (data: DragAndDrop.Data<T>) => void;
  onDragEnter?: (data: DragAndDrop.Data<T>) => void;
  onDragLeave?: (data: DragAndDrop.Data<T>) => void;
  onDrop?: (data: DragAndDrop.Data<T>) => void;
};

export const useDrop = <T extends DragAndDrop.Details>({
  onDragOver,
  onDragEnter,
  onDragLeave,
  onDrop,
}: UseDropProps<T>) => {
  const { data } = useContext<DnDProps<T>>(DnDContext);
  const [, setDragCounter] = useState(0);

  const handleDragEnter = useCallback(
    (data: DragAndDrop.Data<T>) => {
      onDragEnter && onDragEnter(data);
    },
    [onDragEnter]
  );

  const handleDragLeave = useCallback(
    (data: DragAndDrop.Data<T>) => {
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

  return { dropEvents };
};
