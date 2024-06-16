import React from 'react';

type LEDProps = React.PropsWithChildren & {
  on: boolean;
  color: 'Green' | 'Red';
};

const LED: React.FC<LEDProps> = ({ on, color }) => {
  return (
    <div
      className={`led ${
        on
          ? `${color === 'Green' && 'led-on-green'} ${
              color === 'Red' && 'led-on-red'
            }`
          : 'led-off'
      }`}
    ></div>
  );
};

export default React.memo(LED);
