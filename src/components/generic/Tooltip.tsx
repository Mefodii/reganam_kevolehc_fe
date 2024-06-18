import React from 'react';

type TooltipProps = {
  text: string;
  hidden?: boolean;
  className?: string;
};

const Tooltip: React.FC<TooltipProps> = ({
  text,
  hidden = true,
  className = '',
}) => {
  if (!text) return <></>;
  // TODO: (L) maybe have tooltip as root child (similar to spotify)

  return (
    <div className={`tooltip ${hidden ? 'scale-0' : 'scale-100'} ${className}`}>
      {text}
    </div>
  );
};

export default React.memo(Tooltip);
