import React from 'react';

type UtilityPanelSVGProps = SVGContainerProps & {
  SVG: React.FC<SVGProps>;
};

export const UtilityPanelSVG: React.FC<UtilityPanelSVGProps> = React.memo(
  ({ SVG, ...rest }) => {
    return (
      <SVG
        {...rest}
        className={`w-5 ${rest.disabled ? '' : 'simple-clickable-1'}`}
      />
    );
  }
);
