import React from 'react';
import BaseButton, { BaseButtonProps } from './BaseButton';

type SideButtonProps = BaseButtonProps;

const SideButton: React.FC<SideButtonProps> = ({
  className,
  onClick,
  tooltip,
  showTooltipDelay,
  loading,
  children,
}) => {
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
};

export default React.memo(SideButton);
