export type OptionsProps = {
  options: Form.Option[];
  optionDisplay?: (option: Form.Option, i?: number) => string;
  show: boolean;
  className?: string;
  optionClassName?: string;
  onClick: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    option: Form.Option,
    i: number
  ) => void;
};

const Options: React.FC<OptionsProps> = ({
  options,
  optionDisplay = (option) => option,
  className = '',
  optionClassName = '',
  show,
  onClick,
}) => {
  const onOptionClick =
    (option: Form.Option, i: number): React.MouseEventHandler<HTMLDivElement> =>
    (e) => {
      onClick(e, option, i);
    };

  return (
    <div
      className={`option-dropdown-container ${
        show ? 'scale-100' : 'scale-0'
      } ${className}`}
    >
      {options.map((option, i) => {
        return (
          <div
            className={`option-dropdown-item ${optionClassName}`}
            key={i}
            onClick={onOptionClick(option, i)}
          >
            {optionDisplay(option, i)}
          </div>
        );
      })}
    </div>
  );
};

export default Options;
