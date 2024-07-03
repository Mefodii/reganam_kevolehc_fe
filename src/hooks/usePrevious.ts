import { useEffect, useRef } from 'react';

// QUESTION: still cannot comprehend how it manages to have previous value
export const usePrevious = <T>(value: T): T | undefined => {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};
