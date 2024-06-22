import React from 'react';
import { SVGVerticalDots } from '../svg';

type VideoItemPlaceholderProps = React.PropsWithChildren & {
  show: boolean;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
};

const DragDots: React.FC<VideoItemPlaceholderProps> = ({
  show,
  onMouseEnter = (e) => {},
  onMouseLeave = (e) => {},
}) => {
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
};

export default React.memo(DragDots) as typeof DragDots;
