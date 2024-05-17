type SidepanelElementProps = React.PropsWithChildren & {
  className?: string;
  isSelected?: boolean;
  onClick: () => void;
};

const SidepanelElement: React.FC<SidepanelElementProps> = ({
  className = '',
  isSelected = false,
  onClick,
  children,
}) => {
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
};

export default SidepanelElement;
