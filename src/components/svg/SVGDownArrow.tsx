import React from 'react';
import SVGContainer from './SVGContainer';

const SVGDownArrow: React.FC<SVGProps> = (props) => {
  return (
    <SVGContainer {...props}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='1'
          d='M19 9l-7 7-7-7'
        />
      </svg>
    </SVGContainer>
  );
};

export default React.memo(SVGDownArrow);
