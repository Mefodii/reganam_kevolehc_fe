import React, { PropsWithChildren } from 'react';
import { Loading, TooltipContainer } from '../generic';

export type BaseButtonProps = PropsWithChildren<{
  tooltip?: string;
  className?: string;
  loading?: boolean;
  showTooltipDelay?: number;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}>;

export const BaseButton = React.memo(
  ({
    tooltip,
    className = '',
    loading = false,
    showTooltipDelay,
    onClick,
    children,
  }: BaseButtonProps) => {
    return (
      <TooltipContainer
        tooltip={tooltip}
        className={`btn-base ${className}`}
        onClick={onClick}
        delay={showTooltipDelay}
      >
        {children}
        <Loading loading={loading} />
      </TooltipContainer>
    );
  }
);
