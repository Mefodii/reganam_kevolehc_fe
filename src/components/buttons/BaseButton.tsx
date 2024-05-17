import { PropsWithChildren, useState } from 'react';

import { Loading, Tooltip } from '../generic';

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
  showTooltipDelay = 150,
  onClick,
  children,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [showTooltipTimeoutId, setShowTooltipTimeoutId] =
    useState<NodeJS.Timeout | null>(null);

  const onShowTooltip = () => {
    if (!tooltip) return;
    if (showTooltip) return;

    const showTooltipTimeoutId = setTimeout(() => {
      setShowTooltip(true);
      setShowTooltipTimeoutId(null);
    }, showTooltipDelay);
    setShowTooltipTimeoutId(showTooltipTimeoutId);
  };

  const onHideTooltip = () => {
    if (!tooltip) return;
    if (showTooltipTimeoutId) clearTimeout(showTooltipTimeoutId);

    setShowTooltip(false);
  };

  return (
    <div
      className={`btn-base ${className}`}
      onClick={onClick}
      onMouseEnter={onShowTooltip}
      onMouseLeave={onHideTooltip}
    >
      {children}
      <Loading loading={loading} />
      {tooltip && <Tooltip text={tooltip} hidden={!showTooltip} />}
    </div>
  );
};

export default BaseButton;
