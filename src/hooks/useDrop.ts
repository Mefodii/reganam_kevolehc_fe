import { useCallback, useContext, useMemo, useState } from 'react';
import { DnDContext } from '../context';
import { DnDProps } from '../context/DnD';

const isAccepted = (accepted: string[] | string | undefined, type: string) => {
  return (
    accepted === undefined ||
    accepted === type ||
    (Array.isArray(accepted) && accepted.includes(type))
  );
};

export type UseDropProps<T> = {
  accepted?: string[] | string;
  extraValidation?: (item: T, copy: boolean) => boolean; // Validation applied to both onDragEnter and onDrop
  onDragOver?: (data: DnDData<T>) => void;
  onDragEnter?: (item: T) => void;
  onDragLeave?: (data: DnDData<T>) => void;
  onDrop?: (item: T, copy: boolean) => void;
};

export const useDrop = <T>({
  accepted,
  extraValidation = () => true,
  onDragOver,
  onDragEnter,
  onDragLeave,
  onDrop,
}: UseDropProps<T>) => {
  const { data } = useContext<DnDProps<T>>(DnDContext);
  const [, setDragCounter] = useState(0);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragEnter = useCallback(
    (data: DnDData<T>) => {
      if (!onDragEnter || !data.item) return;

      if (
        isAccepted(accepted, data.type) &&
        extraValidation(data.item, data.copy)
      ) {
        setIsDragOver(true);
        onDragEnter(data.item);
      }
    },
    [onDragEnter, extraValidation, accepted]
  );

  const handleDragLeave = useCallback(
    (data: DnDData<T>) => {
      setIsDragOver(false);
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
      setIsDragOver(false);

      if (
        onDrop &&
        isAccepted(accepted, data.type) &&
        data.item &&
        extraValidation(data.item, data.copy)
      ) {
        onDrop(data.item, data.copy);
      }
    },
    [data, onDrop, extraValidation, accepted]
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

  return { isDragOver, dropEvents };
};
