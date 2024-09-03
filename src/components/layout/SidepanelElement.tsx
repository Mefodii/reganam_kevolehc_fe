import React from 'react';

type SidepanelElementProps = React.PropsWithChildren & {
  className?: string;
  isSelected?: boolean;
  onClick: () => void;
};

export const SidepanelElement = React.memo(
  ({
    className = '',
    isSelected = false,
    onClick,
    children,
  }: SidepanelElementProps) => {
    return (
      <div
        className={`side-panel-el ${
          isSelected && 'side-panel-el-active'
        } ${className}`}
        onClick={isSelected ? undefined : onClick}
      >
        {children}
      </div>
    );
  }
);
