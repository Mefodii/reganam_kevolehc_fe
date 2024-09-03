import React from 'react';
import { SVGContainer } from './SVGContainer';

export const SVGDoubleCheck = React.memo((props: SVGProps) => {
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
          d='M2 13l4 4l9 -10'
        />
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
          d='M10 14l3 3l9 -10'
        />
      </svg>
    </SVGContainer>
  );
});
