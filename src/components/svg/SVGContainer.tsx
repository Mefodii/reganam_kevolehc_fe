import React from 'react';
import { useTooltip } from '../../hooks';
import { Tooltip } from '../generic';

const SVGContainer: React.FC<React.PropsWithChildren & SVGContainerProps> = ({
  tooltip,
  tooltipDelay,
  children,
  onClick,
}) => {
  const { showTooltip, handleHideTooltip, handleShowTooltip } = useTooltip(
    tooltip,
    tooltipDelay
  );
  return (
    <div
      className='relative'
      onMouseEnter={handleShowTooltip}
      onMouseLeave={handleHideTooltip}
      onClick={onClick}
    >
      {children}
      {tooltip && <Tooltip text={tooltip} hidden={!showTooltip} />}
    </div>
  );
};

export default React.memo(SVGContainer);
