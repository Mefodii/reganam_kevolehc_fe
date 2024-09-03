import React from 'react';
import { TooltipContainer } from '../generic';

export const SVGContainer = React.memo(
  ({
    disabled = false,
    className,
    tooltip,
    tooltipDelay,
    children,
    onClick,
  }: React.PropsWithChildren & SVGContainerProps) => {
    return (
      <TooltipContainer
        className={`${className} ${
          !disabled && onClick ? 'cursor-pointer' : ''
        }`}
        tooltip={disabled ? undefined : tooltip}
        onClick={disabled ? undefined : onClick}
        delay={tooltipDelay}
      >
        {children}
      </TooltipContainer>
    );
  }
);
