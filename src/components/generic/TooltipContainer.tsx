import React, { useCallback, useRef, useState } from 'react';
import { Tooltip } from './Tooltip';

type TooltipContainerProps = {
  tooltip?: string;
  delay?: number;
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export const TooltipContainer = React.memo(
  ({
    children,
    tooltip,
    delay = 150,
    ...rest
  }: TooltipContainerProps & React.PropsWithChildren) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState<DOMRect | null>(
      null
    );
    const ref = useRef<HTMLDivElement>(null);
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

    const handleShowTooltip = useCallback(() => {
      if (!tooltip) return;
      if (showTooltip) return;

      const id = setTimeout(() => {
        setShowTooltip(true);
        setTimeoutId(null);

        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          setTooltipPosition(rect);
          setShowTooltip(true);
        }
      }, delay);
      setTimeoutId(id);
    }, [tooltip, showTooltip, delay]);

    const handleHideTooltip = useCallback(() => {
      if (!tooltip) return;
      if (timeoutId) clearTimeout(timeoutId);

      setShowTooltip(false);
    }, [tooltip, timeoutId]);

    if (!tooltip) return <div {...rest}>{children}</div>;

    return (
      <div
        ref={ref}
        onMouseEnter={handleShowTooltip}
        onMouseLeave={handleHideTooltip}
        {...rest}
      >
        {children}
        {showTooltip && tooltipPosition && (
          <Tooltip tooltip={tooltip} position={tooltipPosition} />
        )}
      </div>
    );
  }
);
