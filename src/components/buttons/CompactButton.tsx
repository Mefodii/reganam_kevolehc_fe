import React from 'react';
import BaseButton, { BaseButtonProps } from './BaseButton';

type CompactButtonProps = BaseButtonProps & {
  text: string;
};

const CompactButton: React.FC<CompactButtonProps> = ({
  className,
  onClick,
  tooltip,
  showTooltipDelay,
  loading,
  children,
  text,
}) => {
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
};

export default React.memo(CompactButton) as typeof CompactButton;
