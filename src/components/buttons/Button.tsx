import React from 'react';
import { BaseButton, BaseButtonProps } from './BaseButton';

type ButtonProps = BaseButtonProps;

export const Button = React.memo(
  ({
    className,
    onClick,
    tooltip,
    showTooltipDelay,
    loading,
    children,
  }: ButtonProps) => {
    return (
      <BaseButton
        className={`btn ${className}`}
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
