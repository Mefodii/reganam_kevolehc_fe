import { useState } from 'react';

export const useTooltip = (tooltip?: string, delay: number = 150) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [showTooltipTimeoutId, setShowTooltipTimeoutId] =
    useState<NodeJS.Timeout | null>(null);

  const handleShowTooltip = () => {
    if (!tooltip) return;
    if (showTooltip) return;

    const showTooltipTimeoutId = setTimeout(() => {
      setShowTooltip(true);
      setShowTooltipTimeoutId(null);
    }, delay);
    setShowTooltipTimeoutId(showTooltipTimeoutId);
  };

  const handleHideTooltip = () => {
    if (!tooltip) return;
    if (showTooltipTimeoutId) clearTimeout(showTooltipTimeoutId);

    setShowTooltip(false);
  };

  return { showTooltip, handleShowTooltip, handleHideTooltip };
};
