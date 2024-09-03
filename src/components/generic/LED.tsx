import React from 'react';

type LEDProps = React.PropsWithChildren & {
  on: boolean;
  color: 'Green' | 'Red' | 'Yellow';
};

export const LED = React.memo(({ on, color }: LEDProps) => {
  return (
    <div
      className={`led ${
        on
          ? `${color === 'Green' && 'led-on-green'} ${
              color === 'Red' && 'led-on-red'
            } ${color === 'Yellow' && 'led-on-yellow'}`
          : 'led-off'
      }`}
    ></div>
  );
});
