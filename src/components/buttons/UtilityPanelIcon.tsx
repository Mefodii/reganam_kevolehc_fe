import React from 'react';

type UtilityPanelIconProps = {
  SVGComponent: React.FC<SVGProps>;
  isActive: boolean;
  tooltip?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

const UtilityPanelIcon: React.FC<UtilityPanelIconProps> = ({
  SVGComponent,
  isActive,
  tooltip,
  onClick,
}) => (
  <SVGComponent
    className={`w-5 ${
      isActive ? 'cursor-pointer text-text-1/60 hover:text-active-1' : ''
    }`}
    tooltip={isActive ? tooltip : undefined}
    onClick={isActive ? onClick : undefined}
  />
);

export default React.memo(UtilityPanelIcon);
