import React from 'react';
import {
  SVGCalendar,
  SVGCheck,
  SVGCross,
  SVGEye,
  SVGEyeClosed,
} from '../../../components/svg';

type ArtistStatusPanelProps = {
  artist: Model.ArtistDM;
};

export const ArtistStatusPanel = React.memo(
  ({ artist }: ArtistStatusPanelProps) => {
    const { monitoring, releasing, check_date } = artist;

    return (
      <div className='flex space-x-2 justify-end w-36'>
        {monitoring && (
          <SVGEye
            className='transform text-active-1 opacity-40 hover:opacity-100 transition ease-in duration-150 hover:scale-110'
            svgClassName='w-4'
            tooltip='Monitoring'
          />
        )}
        {!monitoring && (
          <SVGEyeClosed
            className='transform text-active-1 opacity-40 hover:opacity-100 transition ease-in duration-150 hover:scale-110'
            svgClassName='w-4'
            tooltip='Not Monitoring'
          />
        )}
        <div className='w-4'>
          {monitoring && releasing && (
            <SVGCheck
              className='transform text-active-2 opacity-40 hover:opacity-100 transition ease-in duration-150 hover:scale-110'
              svgClassName='w-4'
              tooltip='Releasing'
            />
          )}
          {monitoring && !releasing && (
            <SVGCross
              className='transform text-error-1 opacity-40 hover:opacity-100 transition ease-in duration-150 hover:scale-110'
              svgClassName='w-4'
              tooltip='Not Releasing'
            />
          )}
        </div>
        <div className='w-4'>
          {monitoring && (
            <SVGCalendar
              className='transform text-active-1 opacity-40 hover:opacity-100 transition ease-in duration-150 hover:scale-110'
              svgClassName='w-4'
              tooltip={check_date}
            />
          )}
        </div>
      </div>
    );
  }
);
