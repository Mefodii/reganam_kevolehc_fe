import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { selectDndDataIfGroup } from '../../redux/dragAndDropSlice';
import { usePrevious, useAppSelector } from '../../hooks';

export type DropProps = PropsWithChildren<{
  accessGroup: DragAndDrop.AccessGroup;
  onDragOver?: (data: DragAndDrop.Data) => void;
  onDragEnter?: (data: DragAndDrop.Data) => void;
  onDragLeave?: (data: DragAndDrop.Data) => void;
  onDrop?: (data: DragAndDrop.Data) => void;
}>;

const Drop: React.FC<DropProps> = ({
  accessGroup,
  onDragEnter = () => {},
  onDragLeave = () => {},
  onDragOver = () => {},
  onDrop = () => {},
  children,
}) => {
  const [state, setState] = useState({ dragOver: false, dragCounter: 0 });
  const prevState = usePrevious(state);

  const dndData = useAppSelector((state) =>
    selectDndDataIfGroup(state, accessGroup)
  );
  // selectDndDataIfGroup will elimintate unnecessary renders for components
  // which are not in same accessGroup

  useEffect(() => {
    if (!prevState) return;
    if (!dndData) return;

    if (state.dragOver && !prevState.dragOver) onDragEnter(dndData);
    if (!state.dragOver && prevState.dragOver) onDragLeave(dndData);
  }, [state, prevState, onDragEnter, onDragLeave, dndData]);

  const onInnerDragOver: React.DragEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      e.preventDefault();
      if (!dndData) return;

      onDragOver(dndData);
    },
    [onDragOver, dndData]
  );

  const onInnerDragEnter: React.DragEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      setState((prevState) => {
        const dragCounter = prevState.dragCounter + 1;
        const dragOver = dragCounter > 0;
        return { dragOver, dragCounter };
      });
    },
    []
  );

  const onInnerDragLeave: React.DragEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      setState((prevState) => {
        const dragCounter = prevState.dragCounter - 1;
        const dragOver = dragCounter > 0;
        return { dragOver, dragCounter };
      });
    },
    []
  );

  const onInnerDrop: React.DragEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      e.preventDefault();
      if (!dndData) return;

      setState({ dragOver: false, dragCounter: 0 });
      onDrop(dndData);
    },
    [dndData, onDrop]
  );

  return (
    <div
      onDragOver={onInnerDragOver}
      onDragEnter={onInnerDragEnter}
      onDragLeave={onInnerDragLeave}
      onDrop={onInnerDrop}
    >
      {children}
    </div>
  );
};

export default React.memo(Drop);
