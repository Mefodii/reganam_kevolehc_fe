import React, { PropsWithChildren } from 'react';

import { Loading, TooltipContainer } from '../generic';

export type BaseButtonProps = PropsWithChildren<{
  tooltip?: string;
  className?: string;
  loading?: boolean;
  showTooltipDelay?: number;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}>;

const BaseButton: React.FC<BaseButtonProps> = ({
  tooltip,
  className = '',
  loading = false,
  showTooltipDelay,
  onClick,
  children,
}) => {
  return (
    <TooltipContainer
      tooltip={tooltip}
      className={`btn-base ${className}`}
      onClick={onClick}
    >
      {children}
      <Loading loading={loading} />
      {/* {tooltip && <Tooltip text={tooltip} hidden={!showTooltip} />} */}
    </TooltipContainer>
  );
};

export default React.memo(BaseButton) as typeof BaseButton;
