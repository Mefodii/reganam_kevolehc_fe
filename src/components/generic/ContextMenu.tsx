import React from 'react';

type ContextMenuProps = {
  coords: Coords;
};

const ContextMenu: React.FC<ContextMenuProps & React.PropsWithChildren> = ({
  coords,
  children,
}) => {
  return (
    <div
      className='absolute bg-theme-1/100 border border-active-1/20 z-50'
      style={{
        top: coords.y + 'px',
        left: coords.x + 'px',
      }}
    >
      {children}
    </div>
  );
};

export default React.memo(ContextMenu) as typeof ContextMenu;
