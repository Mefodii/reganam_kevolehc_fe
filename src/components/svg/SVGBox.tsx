import React from 'react';
import { SVGContainer } from './SVGContainer';

export const SVGBox = React.memo((props: SVGProps) => {
  return (
    <SVGContainer {...props}>
      <svg
        className={props.svgClassName}
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
      </svg>
    </SVGContainer>
  );
});
