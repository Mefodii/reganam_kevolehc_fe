import React, { PropsWithChildren } from 'react';

import { Loading, Tooltip } from '../generic';
import { useTooltip } from '../../hooks';

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
  const { showTooltip, handleHideTooltip, handleShowTooltip } = useTooltip(
    tooltip,
    showTooltipDelay
  );

  return (
    <div
      className={`btn-base ${className}`}
      onClick={onClick}
      onMouseEnter={handleShowTooltip}
      onMouseLeave={handleHideTooltip}
    >
      {children}
      <Loading loading={loading} />
      {tooltip && <Tooltip text={tooltip} hidden={!showTooltip} />}
    </div>
  );
};

export default React.memo(BaseButton);
