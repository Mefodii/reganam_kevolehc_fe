import React from 'react';
import ReactDOM from 'react-dom';

type TooltipProps = {
  tooltip: string;
  position: DOMRect;
};

export const Tooltip = React.memo(({ tooltip, position }: TooltipProps) => {
  return ReactDOM.createPortal(
    <div
      className='tooltip'
      style={{
        top: position.top + position.height + 10 + 'px',
        left: position.left + position.width / 2 + 'px',
      }}
    >
      {tooltip}
    </div>,
    document.getElementById('portal-root')!
  );
});
