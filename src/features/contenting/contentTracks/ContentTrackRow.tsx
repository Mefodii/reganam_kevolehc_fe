import React from 'react';

type ContentTrackRowProps = {
  contentTrack: Model.ContentTrackDM;
};
const ContentTrackRow: React.FC<ContentTrackRowProps> = ({ contentTrack }) => {
  const { name, position } = contentTrack;

  return (
    <div>
      <div className='flex bg-theme-3/30 justify-between items-center pt-2 hover:bg-theme-3/50'>
        <div className='w-20 text-lg opacity-20 text-right mr-4'>
          {position}
        </div>
        <div className='pl-2 pr-4 mr-4 text-active-1/70 border-r-2 border-active-1/50'>
          xx:xx:xx
        </div>
        <div className='flex-3'>{name}</div>
      </div>
    </div>
  );
};

export default ContentTrackRow;
