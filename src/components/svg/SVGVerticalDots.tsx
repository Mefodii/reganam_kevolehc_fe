import React from 'react';
import { SVGContainer } from './SVGContainer';

export const SVGVerticalDots = React.memo((props: SVGProps) => {
  return (
    <SVGContainer {...props}>
      <svg
        className={props.svgClassName}
        xmlns='http://www.w3.org/2000/svg'
        fill='currentColor'
        viewBox='0 0 29.96 122.88'
        stroke='currentColor'
      >
        <path d='M15,0A15,15,0,1,1,0,15,15,15,0,0,1,15,0Zm0,92.93a15,15,0,1,1-15,15,15,15,0,0,1,15-15Zm0-46.47a15,15,0,1,1-15,15,15,15,0,0,1,15-15Z' />
      </svg>
    </SVGContainer>
  );
});
