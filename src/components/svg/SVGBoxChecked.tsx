import React from 'react';
import SVGContainer from './SVGContainer';

const SVGBoxChecked: React.FC<SVGProps> = ({
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
        strokeWidth='1.5'
        stroke='currentColor'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M1 1 l 0 23 l 23 0 l 0 -23 l -23 0'
        />
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
          d='M5 13l4 4L19 7'
        />
      </svg>
    </SVGContainer>
  );
};

export default React.memo(SVGBoxChecked);
