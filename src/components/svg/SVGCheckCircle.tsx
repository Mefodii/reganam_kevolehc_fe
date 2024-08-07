import React from 'react';
import SVGContainer from './SVGContainer';

const SVGCheckCircle: React.FC<SVGProps> = (props) => {
  return (
    <SVGContainer {...props}>
      <svg
        className={props.svgClassName}
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
          d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
        />
      </svg>
    </SVGContainer>
  );
};

export default React.memo(SVGCheckCircle) as typeof SVGCheckCircle;
