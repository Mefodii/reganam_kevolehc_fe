import React, { PropsWithChildren } from 'react';
import Drag, { DragProps } from './Drag';
import Drop, { DropProps } from './Drop';

type DragAndDropProps = Omit<DragProps & DropProps, 'accessGroup'>;

const DragAndDrop = ({
  draggable,
  details,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDragEnter,
  onDragLeave,
  onDrop,
  children,
}: PropsWithChildren<DragAndDropProps>) => {
  return (
    <Drag
      draggable={draggable}
      details={details}
      onDragEnd={onDragEnd}
      onDragStart={onDragStart}
    >
      <Drop
        accessGroup={details.accessGroup}
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

export default React.memo(DragAndDrop);
