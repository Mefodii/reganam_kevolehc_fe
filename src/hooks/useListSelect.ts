import { useCallback, useState } from 'react';

export const useListSelect = (): [
  number[],
  (index: number, shiftKey: boolean) => void,
  () => void
] => {
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);

  const handleSelect = useCallback((index: number, shiftKey: boolean) => {
    setSelectedIndexes((prevIndexes) => {
      const iPrev = prevIndexes.at(-1);
      if (shiftKey && iPrev !== undefined && iPrev !== index) {
        const start = Math.min(iPrev, index);
        let range = Array.from(
          { length: Math.abs(iPrev - index) + 1 },
          (_, i) => i + start
        );
        range = index < iPrev ? range.reverse() : range;

        const cleanIds = prevIndexes.filter((i) => !range.includes(i));
        return prevIndexes.includes(index) ? cleanIds : [...cleanIds, ...range];
      }

      return prevIndexes.includes(index)
        ? prevIndexes.filter((id) => id !== index)
        : [...prevIndexes, index];
    });
  }, []);

  const resetSelection = useCallback(() => setSelectedIndexes([]), []);

  return [selectedIndexes, handleSelect, resetSelection];
};
