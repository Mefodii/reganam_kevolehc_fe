import React from 'react';
import SVGContainer from './SVGContainer';

const SVGSave: React.FC<SVGProps> = ({
  className,
  tooltip,
  tooltipDelay,
  onClick,
}) => {
  return (
    <SVGContainer
      tooltip={tooltip}
      tooltipDelay={tooltipDelay}
      onClick={onClick}
    >
      <svg
        className={className}
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
          d='M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4'
        />
      </svg>
    </SVGContainer>
  );
};

export default React.memo(SVGSave);
