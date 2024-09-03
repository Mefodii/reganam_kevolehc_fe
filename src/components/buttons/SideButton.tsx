import React from 'react';
import { BaseButton, BaseButtonProps } from './BaseButton';

type SideButtonProps = BaseButtonProps;

export const SideButton = React.memo(
  ({
    className,
    onClick,
    tooltip,
    showTooltipDelay,
    loading,
    children,
  }: SideButtonProps) => {
    return (
      <BaseButton
        className={`side-panel-btn ${className}`}
        onClick={onClick}
        tooltip={tooltip}
        showTooltipDelay={showTooltipDelay}
        loading={loading}
      >
        {children}
      </BaseButton>
    );
  }
);
