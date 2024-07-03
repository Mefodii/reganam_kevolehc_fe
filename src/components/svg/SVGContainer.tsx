import React from 'react';
import { TooltipContainer } from '../generic';

const SVGContainer: React.FC<React.PropsWithChildren & SVGContainerProps> = ({
  disabled = false,
  className,
  tooltip,
  tooltipDelay,
  children,
  onClick,
}) => {
  return (
    <TooltipContainer
      className={`${className} ${!disabled && onClick ? 'cursor-pointer' : ''}`}
      tooltip={disabled ? undefined : tooltip}
      onClick={disabled ? undefined : onClick}
      delay={tooltipDelay}
    >
      {children}
    </TooltipContainer>
  );
};

export default React.memo(SVGContainer);
