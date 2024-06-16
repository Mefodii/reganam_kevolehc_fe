import React from 'react';
import InputContainer, { InputContainerProps } from './InputContainer';

export type RadioProps = InputContainerProps & {
  name: string;
  value: Form.Option;
  disabled?: boolean;
  simple?: boolean;
  deselect?: boolean;
  options: Form.Option[];
  optionDisplay?: (option: Form.Option, i?: number) => string;
  optionClassName?: string;
  containerClassName?: string;
  onChange: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    payload: Form.Payload<Form.Option>
  ) => void;
};

const Radio = ({
  label,
  error,
  className = '',
  // ^ InputContainerProps
  name,
  value,
  disabled,
  simple,
  deselect,
  options,
  optionDisplay = (option: Form.Option) => option,
  optionClassName,
  containerClassName,
  onChange,
}: RadioProps) => {
  const selectOption =
    (option: Form.Option): React.MouseEventHandler<HTMLDivElement> =>
    (e) => {
      onInputChange(e, option);
    };

  const deselectOption = (): React.MouseEventHandler<HTMLDivElement> => (e) => {
    onInputChange(e, undefined);
  };

  const onInputChange = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    value: Form.Option | undefined
  ) => {
    onChange(e, { name, value });
  };

  const isOptionSelected = (option: Form.Option) => value === option;

  const renderInput = () => {
    return (
      <div className={`${className}`}>
        {options.map((option, i) => {
          const isSelected = isOptionSelected(option);
          const onClick = disabled
            ? undefined
            : isSelected
            ? deselect
              ? deselectOption()
              : undefined
            : selectOption(option);

          return (
            <div
              key={i}
              className={`option-radio ${isSelected && 'option-selected'} ${
                disabled && !isSelected && 'option-disabled'
              } ${
                disabled && isSelected && 'option-selected-disabled'
              } ${optionClassName}
                `}
              onClick={onClick}
            >
              {optionDisplay(option)}
            </div>
          );
        })}
      </div>
    );
  };

  if (simple) return renderInput();

  return (
    <InputContainer label={label} error={error} className={containerClassName}>
      {renderInput()}
    </InputContainer>
  );
};

export default React.memo(Radio);
