import { useCallback, useContext, useMemo, useState } from 'react';
import { DnDContext } from '../context';
import { DnDData, DnDProps } from '../context/DnD';

type Accepted = string[] | string | undefined;
type ExtraValidation<E extends HTMLElement, T> = (
  e: React.DragEvent<E>,
  item: T,
  copy: boolean
) => boolean;
type ValidationData<E extends HTMLElement, T> = {
  e: React.DragEvent<E>;
  data: DnDData<T>;
  accepted: Accepted;
  extraValidation?: ExtraValidation<E, T>;
  dataTransfer: boolean;
};

const validateAccepted = (
  accepted: string[] | string | undefined,
  type: string
) => {
  return (
    accepted === undefined ||
    accepted === type ||
    (Array.isArray(accepted) && accepted.includes(type))
  );
};

const isValid = <E extends HTMLElement, T>({
  e,
  data,
  accepted,
  extraValidation,
  dataTransfer,
}: ValidationData<E, T>): boolean => {
  if (!validateAccepted(accepted, data.type)) return false;
  if (dataTransfer) {
    if (extraValidation) {
      throw new Error('extraValidation not supported yet for dataTransfer');
    }
    return true;
  }

  if (!data.item) return false;
  if (extraValidation && !extraValidation(e, data.item, data.copy))
    return false;

  return true;
};

export type UseDropProps<E extends HTMLElement, T> = {
  accepted?: Accepted;
  dataTransfer?: boolean;
  extraValidation?: ExtraValidation<E, T>; // NOTE: Validation applied to all drag/drop events
  onDragEnter?: (e: React.DragEvent<E>, item: T, copy: boolean) => void;
  onDragLeave?: (e: React.DragEvent<E>, item: T, copy: boolean) => void;
  onDrop?: (e: React.DragEvent<E>, item: T, copy: boolean) => void;
};

export type DropState = {
  isDragOver: boolean;
};
export type DropEvents<E extends HTMLElement> = {
  onDragEnter: React.DragEventHandler<E>;
  onDragLeave: React.DragEventHandler<E>;
  onDragOver: React.DragEventHandler<E>;
  onDrop: React.DragEventHandler<E>;
};
export type UseDropReturn<E extends HTMLElement> = DropState & {
  dropEvents: DropEvents<E>;
};

export const useDrop = <E extends HTMLElement, T = unknown>({
  accepted,
  dataTransfer = false,
  extraValidation,
  onDragEnter,
  onDragLeave,
  onDrop,
}: UseDropProps<E, T>): UseDropReturn<E> => {
  const { data, getItem } = useContext<DnDProps<T, E>>(DnDContext);
  const [, setDragCounter] = useState(0);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragEnter = useCallback(
    (e: React.DragEvent<E>, data: DnDData<T>) => {
      if (!isValid({ e, data, accepted, extraValidation, dataTransfer }))
        return;

      onDragEnter && onDragEnter(e, getItem(e, dataTransfer), data.copy);
      setIsDragOver(true);
    },
    [onDragEnter, extraValidation, getItem, accepted, dataTransfer]
  );

  const handleDragLeave = useCallback(
    (e: React.DragEvent<E>, data: DnDData<T>) => {
      if (!isValid({ e, data, accepted, extraValidation, dataTransfer }))
        return;

      onDragLeave && onDragLeave(e, getItem(e, dataTransfer), data.copy);
      setIsDragOver(false);
    },
    [onDragLeave, extraValidation, getItem, accepted, dataTransfer]
  );

  const handleDragOver = useCallback((e: React.DragEvent<E>) => {
    e.preventDefault();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<E>) => {
      e.preventDefault();
      setDragCounter(0);
      setIsDragOver(false);

      if (!isValid({ e, data, accepted, extraValidation, dataTransfer }))
        return;

      onDrop && onDrop(e, getItem(e, dataTransfer), data.copy);
    },
    [onDrop, data, extraValidation, getItem, accepted, dataTransfer]
  );

  const handleDragPass = useCallback(
    (e: React.DragEvent<E>, mod: number) => {
      setDragCounter((prevCounter) => {
        const newCounter = prevCounter + mod;

        if (prevCounter === 0 && newCounter === 1) {
          handleDragEnter(e, data);
        }
        if (prevCounter === 1 && newCounter === 0) {
          handleDragLeave(e, data);
        }

        return newCounter;
      });
    },
    [handleDragEnter, handleDragLeave, data]
  );

  const dropEvents: DropEvents<E> = useMemo(
    () => ({
      onDragEnter: (e: React.DragEvent<E>) => handleDragPass(e, 1),
      onDragLeave: (e: React.DragEvent<E>) => handleDragPass(e, -1),
      onDragOver: handleDragOver,
      onDrop: handleDrop,
    }),
    [handleDragPass, handleDragOver, handleDrop]
  );

  return { isDragOver, dropEvents };
};
