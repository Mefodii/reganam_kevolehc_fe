import React from 'react';
import { parseStartTime } from '../../../util/functions';
import TrackStatusPanel from '../../listening/tracks/TrackStatusPanel';

type NonTrackRowProps = {
  title: string;
  position: number;
  startTime: number | null;
};
const NonTrackRow: React.FC<NonTrackRowProps> = ({
  title,
  position,
  startTime,
}) => {
  return (
    <div>
      <div className='group pl-10 pr-4 flex bg-theme-3/30 justify-between items-center pt-2 hover:bg-theme-3/50'>
        <div
          className={`pl-2 pr-4 mr-4 text-error-1/60 border-error-1/40 border-r-2`}
        >
          {parseStartTime(startTime)}
        </div>
        <div className={`flex-3 text-error-1/60`}>{title}</div>
        <div className='w-12 text-lg text-text-1/10 group-hover:text-text-1/70 text-right'>
          {position}
        </div>
      </div>
    </div>
  );
};

type TrackRowProps = NonTrackRowProps & {
  track: Model.TrackDM;
};
const TrackRow: React.FC<TrackRowProps> = ({
  title,
  position,
  startTime,
  track,
}) => {
  return (
    <div>
      <div className='group pl-10 pr-5 flex bg-theme-3/30 justify-between items-center pt-2 hover:bg-theme-3/50'>
        <div
          className={`pl-2 pr-4 mr-4 text-active-1/40 border-active-1/40 group-hover:text-active-1/70 group-hover:border-active-1/70 border-r-2`}
        >
          {parseStartTime(startTime)}
        </div>
        <div className={`flex-3 text-text-1/70 group-hover:text-text-1/100`}>
          {title}
        </div>
        <TrackStatusPanel track={track} />
        <div className='w-12 text-lg text-text-1/10 group-hover:text-text-1/70 text-right'>
          {position}
        </div>
      </div>
    </div>
  );
};

type ContentTrackRowProps = {
  contentTrack: Model.ContentTrackDM;
};
const ContentTrackRow: React.FC<ContentTrackRowProps> = ({ contentTrack }) => {
  const { id, title, position, start_time, is_track, track } = contentTrack;

  if (is_track) {
    if (!track) {
      throw new Error(
        `Track expected for item: <${id}> ${title} - ${position}`
      );
    }

    return (
      <TrackRow
        title={title}
        position={position}
        startTime={start_time}
        track={track}
      />
    );
  }

  return (
    <NonTrackRow title={title} position={position} startTime={start_time} />
  );
};

export default React.memo(ContentTrackRow) as typeof ContentTrackRow;
