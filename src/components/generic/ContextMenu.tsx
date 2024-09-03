import React from 'react';

type ContextMenuProps = {
  coords: Coords;
};

export const ContextMenu = React.memo(
  ({ coords, children }: ContextMenuProps & React.PropsWithChildren) => {
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
  }
);
