import BaseButton, { BaseButtonProps } from './BaseButton';

type ButtonProps = BaseButtonProps;

const Button: React.FC<ButtonProps> = ({
  className,
  onClick,
  tooltip,
  showTooltipDelay,
  loading,
  children,
}) => {
  return (
    <BaseButton
      className={`btn ${className}`}
      onClick={onClick}
      tooltip={tooltip}
      showTooltipDelay={showTooltipDelay}
      loading={loading}
    >
      {children}
    </BaseButton>
  );
};

export default Button;
