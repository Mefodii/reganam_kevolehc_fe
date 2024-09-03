import React from 'react';
import { SVGContainer } from './SVGContainer';

export const SVGArrow = React.memo((props: SVGProps) => {
  return (
    <SVGContainer {...props}>
      <svg
        className={props.svgClassName}
        xmlns='http://www.w3.org/2000/svg'
        fill='currentColor'
        viewBox='0 0 24 24'
        stroke='currentColor'
      >
        <path d='M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z' />
      </svg>
    </SVGContainer>
  );
});
