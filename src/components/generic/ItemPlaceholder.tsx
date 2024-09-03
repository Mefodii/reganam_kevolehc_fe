import React from 'react';

type VideoItemPlaceholderProps = React.PropsWithChildren & {
  show: boolean;
  className?: string;
};

export const ItemPlaceholder = React.memo(
  ({ show, className }: VideoItemPlaceholderProps) => {
    if (!show) return <></>;

    return <div className={`${className}`}></div>;
  }
);
