import React from 'react';
import { InputContainer, InputContainerProps } from './InputContainer';

export type RadioProps<T> = InputContainerProps & {
  name: string;
  value: Form.Option<T>;
  disabled?: boolean;
  simple?: boolean;
  deselect?: boolean;
  options: Form.Option<T>[];
  optionDisplay?: (option: Form.Option<T>, i?: number) => string;
  optionClassName?: string;
  containerClassName?: string;
  onChange: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    payload: Form.Payload<Form.Option<T>>
  ) => void;
};

const RadioBase = <T,>({
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
  optionDisplay = (option, i) => option + '',
  optionClassName,
  containerClassName,
  onChange,
}: RadioProps<T>) => {
  const selectOption =
    (option: Form.Option<T>): React.MouseEventHandler<HTMLDivElement> =>
    (e) => {
      handleChange(e, option);
    };

  const deselectOption = (): React.MouseEventHandler<HTMLDivElement> => (e) => {
    handleChange(e, null);
  };

  const handleChange = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    value: Form.Option<T>
  ) => {
    onChange(e, { name, value });
  };

  const isOptionSelected = (option: Form.Option<T>) => value === option;

  const renderInput = () => {
    return (
      <div className={`${className}`}>
        {options.map((option, i) => {
          const isSelected = isOptionSelected(option);
          const handleClick = disabled
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
              onClick={handleClick}
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

export const Radio = React.memo(RadioBase) as typeof RadioBase;
