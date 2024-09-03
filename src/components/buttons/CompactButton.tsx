import React from 'react';
import { BaseButton, BaseButtonProps } from './BaseButton';

type CompactButtonProps = BaseButtonProps & {
  text: string;
};

export const CompactButton = React.memo(
  ({
    className,
    onClick,
    tooltip,
    showTooltipDelay,
    loading,
    children,
    text,
  }: CompactButtonProps) => {
    return (
      <BaseButton
        className={`btn-compact ${className}`}
        onClick={onClick}
        tooltip={tooltip}
        showTooltipDelay={showTooltipDelay}
        loading={loading}
      >
        {children}
        <div className={`btn-compact-text`}>{text}</div>
      </BaseButton>
    );
  }
);
