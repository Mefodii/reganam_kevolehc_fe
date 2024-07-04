import React from 'react';

type LEDProps = React.PropsWithChildren & {
  on: boolean;
  color: 'Green' | 'Red' | 'Yellow';
};

const LED: React.FC<LEDProps> = ({ on, color }) => {
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
};

export default React.memo(LED) as typeof LED;
