import { PropsWithChildren } from 'react';
import Drag, { DragProps } from './Drag';
import Drop, { DropProps } from './Drop';

type DragAndDropProps = DragProps & DropProps;

const DragAndDrop = ({
  draggable,
  accessGroup,
  onDragStart,
  onDragEnd,
  item,
  type,
  onDragOver,
  onDragEnter,
  onDragLeave,
  onDrop,
  children,
}: PropsWithChildren<DragAndDropProps>) => {
  return (
    <Drag
      draggable={draggable}
      accessGroup={accessGroup}
      item={item}
      type={type}
      onDragEnd={onDragEnd}
      onDragStart={onDragStart}
    >
      <Drop
        accessGroup={accessGroup}
        onDragOver={onDragOver}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        {children}
      </Drop>
    </Drag>
  );
};

export default DragAndDrop;
