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

  return (
    <div className={`tooltip ${hidden ? 'scale-0' : 'scale-100'} ${className}`}>
      {text}
    </div>
  );
};

export default Tooltip;
