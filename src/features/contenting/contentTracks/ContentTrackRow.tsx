import React from 'react';

type ContentTrackRowProps = {
  contentTrack: Model.ContentTrackDM;
};
const ContentTrackRow: React.FC<ContentTrackRowProps> = ({ contentTrack }) => {
  const { name, position } = contentTrack;

  return (
    <div>
      <div className='group pr-10 pl-20 flex bg-theme-3/30 justify-between items-center pt-2 hover:bg-theme-3/50'>
        <div className='pl-2 pr-4 mr-4 text-active-1/40 border-r-2 border-active-1/40'>
          xx:xx:xx
        </div>
        <div className='flex-3'>{name}</div>
        <div className='w-12 text-lg text-text-1/10 group-hover:text-text-1/70 text-right'>
          {position}
        </div>
      </div>
    </div>
  );
};

export default React.memo(ContentTrackRow) as typeof ContentTrackRow;
