import React, { useState } from 'react';
import {
  SVGCheck,
  SVGDoubleCheck,
  SVGDroplet,
  SVGPencil,
  SVGThumbDown,
  SVGThumbUp,
} from '../../../components/svg';
import { track as model } from '../../../models';

// const styles = {
//   container: 'flex space-x-2 justify-end w-36',
//   thumbsContainer: 'flex justify-center space-x-3',
//   iconBase:
//     'cursor-pointer hover:opacity-100 transition ease-in duration-150 hover:scale-110 w-4',
//   thumbUp: (mouseOverThumbs: boolean, like: boolean | null) =>
//     `${mouseOverThumbs || like ? 'opacity-40' : 'opacity-0'} ${
//       like ? 'text-active-2' : 'text-text-1'
//     }`,
//   thumbDown: (mouseOverThumbs: boolean, like: boolean | null) =>
//     `${mouseOverThumbs || like === false ? 'opacity-40' : 'opacity-0'} ${
//       like === false ? 'text-error-1' : 'text-text-1'
//     }`,
//   statusIcon: (is_clean: boolean, double_checked: boolean) => {
//     if (is_clean && !double_checked) {
//       return 'transform text-warning-1 opacity-40 hover:opacity-100 transition ease-in duration-150 hover:scale-110';
//     } else if (is_clean && double_checked) {
//       return 'transform text-active-2 opacity-40 hover:opacity-100 transition ease-in duration-150 hover:scale-110';
//     } else {
//       return 'transform text-error-1 opacity-40 hover:opacity-100 transition ease-in duration-150 hover:scale-110';
//     }
//   },
//   checkIcon:
//     'transform text-active-2 opacity-40 hover:opacity-100 transition ease-in duration-150 hover:scale-110',
// };

type TrackStatusPanelProps = {
  track: Model.TrackDM;
};

export const TrackStatusPanel = React.memo(
  ({ track }: TrackStatusPanelProps) => {
    const like = model.getLike(track);

    const [mouseOver, setMouseOver] = useState(false);

    const [mouseOverThumbs, setMouseOverThumbs] = useState(false);
    const { is_clean, double_checked } = track;

    let className =
      'transform text-error-1 opacity-40 hover:opacity-100 transition ease-in duration-150 hover:scale-110';
    let tooltip = 'Not Clean';

    if (is_clean && !double_checked) {
      className =
        'transform text-warning-1 opacity-40 hover:opacity-100 transition ease-in duration-150 hover:scale-110';
      tooltip = 'Clean & !Checked';
    } else if (is_clean && double_checked) {
      className =
        'transform text-active-2 opacity-40 hover:opacity-100 transition ease-in duration-150 hover:scale-110';
      tooltip = 'Clean & Checked';
    }

    // TODO: (L) - changing from like to dislike should not be allowed (yet).
    //   Such a change should generate a new note with an action to perform on music library

    // TODO: (L) - some icon for status.MISSING
    return (
      <div
        className='flex space-x-2 justify-end w-36'
        onMouseEnter={() => setMouseOver(true)}
        onMouseLeave={() => setMouseOver(false)}
      >
        <div
          className={`flex justify-center space-x-3`}
          onMouseEnter={() => setMouseOverThumbs(true)}
          onMouseLeave={() => setMouseOverThumbs(false)}
        >
          <SVGThumbUp
            className={`cursor-pointer ${
              mouseOverThumbs || like ? 'opacity-40' : 'opacity-0'
            } hover:opacity-100 transition ease-in duration-150 hover:scale-110 ${
              like ? 'text-active-2' : 'text-text-1'
            }`}
            svgClassName={`w-4`}
          />
          <SVGThumbDown
            className={`cursor-pointer ${
              mouseOverThumbs || like === false ? 'opacity-40' : 'opacity-0'
            } hover:opacity-100 transition ease-in duration-150 hover:scale-110 ${
              like === false ? 'text-error-1' : 'text-text-1'
            }`}
            svgClassName={`w-4`}
          />
        </div>
        <div className='w-4'>
          {model.isDownloaded(track) && (
            <SVGCheck
              className='transform text-active-2 opacity-40 hover:opacity-100 transition ease-in duration-150 hover:scale-110'
              svgClassName='w-4'
              tooltip='Downloaded'
            />
          )}
          {model.isInLibrary(track) && (
            <SVGDoubleCheck
              className='transform text-active-2 opacity-40 hover:opacity-100 transition ease-in duration-150 hover:scale-110'
              svgClassName='w-4'
              tooltip='In Library'
            />
          )}
        </div>
        <SVGDroplet
          className={className}
          svgClassName='w-4'
          tooltip={tooltip}
        />
        <SVGPencil
          className={`row-icon px-0 ${mouseOver ? 'opacity-100' : 'opacity-0'}`}
          tooltip='Edit Track'
        />
      </div>
    );
  }
);
