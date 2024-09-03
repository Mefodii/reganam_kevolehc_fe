import React from 'react';
import { SVGContainer } from './SVGContainer';

export const SVGDownArrow = React.memo((props: SVGProps) => {
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
          strokeWidth='1'
          d='M19 9l-7 7-7-7'
        />
      </svg>
    </SVGContainer>
  );
});
