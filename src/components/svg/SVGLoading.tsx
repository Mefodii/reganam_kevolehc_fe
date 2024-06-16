import React from 'react';
import SVGContainer from './SVGContainer';

const SVGLoading: React.FC<SVGProps> = ({
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
        fill='currentColor'
        viewBox='0 0 100 100'
        stroke='currentColor'
      >
        <path d='M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50' />
      </svg>
    </SVGContainer>
  );
};

export default React.memo(SVGLoading);
