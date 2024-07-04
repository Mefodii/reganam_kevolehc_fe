import React from 'react';
import SVGContainer from './SVGContainer';

const SVGPlus: React.FC<SVGProps> = (props) => {
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
          d='M12 4v16m8-8H4'
        />
      </svg>
    </SVGContainer>
  );
};

export default React.memo(SVGPlus) as typeof SVGPlus;
