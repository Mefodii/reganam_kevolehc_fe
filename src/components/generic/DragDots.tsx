import React from 'react';
import { SVGVerticalDots } from '../svg';

type VideoItemPlaceholderProps = React.PropsWithChildren & {
  show: boolean;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
};

export const DragDots = React.memo(
  ({
    show,
    onMouseEnter = (e) => {},
    onMouseLeave = (e) => {},
  }: VideoItemPlaceholderProps) => {
    return (
      <div
        className={`my-auto flex mr-2 cursor-pointer w-4 text-text-1/20 space-x-0.5 ${
          show ? 'opacity-100' : 'opacity-0'
        }`}
        onMouseEnter={(e) => onMouseEnter(e)}
        onMouseLeave={(e) => onMouseLeave(e)}
      >
        <SVGVerticalDots className='w-1' />
        <SVGVerticalDots className='w-1' />
      </div>
    );
  }
);
