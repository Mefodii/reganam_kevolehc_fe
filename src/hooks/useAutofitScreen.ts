import { useEffect, useRef } from 'react';
import { usePrevious } from './usePrevious';
import { useWindowSize } from '@uidotdev/usehooks';

export const useAutofitScreen = <T extends HTMLElement>(
  initialValue: T | null,
  minHeight: number = 400,
  clearence: number = 50
) => {
  const ref = useRef<T>(initialValue);
  const size = useWindowSize();
  const prevSize = usePrevious(size);

  useEffect(() => {
    if (size.height && size.height !== prevSize?.height) {
      if (ref.current) {
        const newHeight =
          size.height - ref.current.getBoundingClientRect().y - clearence;
        ref.current.style.maxHeight = Math.max(newHeight, minHeight) + 'px';
      }
    }
  }, [
    ref?.current?.style.maxHeight,
    size?.height,
    prevSize?.height,
    minHeight,
    clearence,
  ]);

  return ref;
};
