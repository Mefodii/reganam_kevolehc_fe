import React from 'react';

type VideoItemPlaceholderProps = React.PropsWithChildren & {
  show: boolean;
  className?: string;
};

const ItemPlaceholder: React.FC<VideoItemPlaceholderProps> = ({
  show,
  className,
}) => {
  if (!show) return <></>;

  return <div className={`${className}`}></div>;
};

export default React.memo(ItemPlaceholder);
