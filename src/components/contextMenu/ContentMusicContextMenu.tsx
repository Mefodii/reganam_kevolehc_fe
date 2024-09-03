import React from 'react';
import { ContentMusic } from '../../api/api-utils';
import { ContextMenu } from '../generic';

type ContentMusicContextMenuProps = {
  coords: {
    x: number;
    y: number;
  };
  onClick: (type: ContentMusic) => void;
};

export const ContentMusicContextMenu = React.memo(
  ({ coords, onClick }: ContentMusicContextMenuProps) => {
    return (
      <ContextMenu coords={coords}>
        {Object.values(ContentMusic).map((type) => (
          <div
            className='px-3 py-2 hover:bg-theme-3/50'
            key={type}
            onClick={() => onClick(type)}
          >
            {type}
          </div>
        ))}
      </ContextMenu>
    );
  }
);
