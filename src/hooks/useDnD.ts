import { UseDropProps, useDrop } from './useDrop';
import { useDrag } from './useDrag';

export const useDnD = <T>(
  type: string,
  item: T,
  dropProps: UseDropProps<T>
) => {
  const drag = useDrag<T>(type, item);
  const drop = useDrop<T>({
    ...dropProps,
    accepted: dropProps.accepted ? dropProps.accepted : type,
  });
  return { ...drag, ...drop };
};
