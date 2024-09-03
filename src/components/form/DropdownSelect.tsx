import React, { useState } from 'react';
import { BLANK_VALUE } from '../../util/constants';
import { InputContainer, InputContainerProps } from './InputContainer';

export type DropdownSelectProps<T> = InputContainerProps & {
  name: string;
  value: Form.Option<T>;
  placeholder?: string;
  nullable?: boolean;
  hideOnChange?: boolean;
  disabled?: boolean;
  simple?: boolean;
  options: Form.Option<T>[];
  optionDisplay?: (option: Form.Option<T>, i?: number) => string;
  optionClassName?: string;
  optionContainerClassName?: string;
  containerClassName?: string;
  onChange: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    payload: Form.Payload<Form.Option<T>>
  ) => void;
};

// Note: In case ref will be required: https://fettblog.eu/typescript-react-generic-forward-refs/
const DropdownSelectBase = <T,>({
  label,
  error,
  className = '',
  // ^ InputContainerProps
  name,
  value,
  placeholder = BLANK_VALUE,
  nullable = false,
  hideOnChange = true,
  disabled,
  simple,
  options,
  optionDisplay = (option, i) => option + '',
  optionClassName,
  optionContainerClassName,
  containerClassName,
  onChange,
}: DropdownSelectProps<T>) => {
  const [showOptions, setShowOptions] = useState(false);

  const isSelected = () =>
    (value && options.includes(value)) || (nullable && value === null);

  const handleOptionClick =
    (option: Form.Option<T>, i: number) =>
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (option !== value) {
        handleChange(e, { name, value: option });
      }

      if (option === value && nullable) {
        handleChange(e, { name, value: null });
      }
    };

  const handleChange = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    payload: Form.Payload<Form.Option<T>>
  ) => {
    onChange(e, payload);
    if (hideOnChange) setShowOptions(false);
  };

  const renderInput = () => {
    const optionsHidden = disabled || !showOptions;
    const shownValue = value ? optionDisplay(value) : placeholder;

    return (
      <div
        className='relative'
        onMouseEnter={() => setShowOptions(true)}
        onMouseLeave={() => setShowOptions(false)}
      >
        <div
          className={`option-single
          ${isSelected() && 'option-selected'}
          ${disabled && 'option-disabled'}
          ${className}
          `}
        >
          {shownValue}
        </div>
        <div
          className={`option-dropdown-container ${
            optionsHidden ? 'scale-0' : 'scale-100'
          } ${optionContainerClassName}`}
        >
          {nullable && (
            <div
              className={`option-dropdown-item ${optionClassName}`}
              onClick={handleOptionClick(null, -1)}
            >
              {BLANK_VALUE}
            </div>
          )}
          {options.map((option, i) => {
            return (
              <div
                className={`option-dropdown-item ${optionClassName}`}
                key={i}
                onClick={handleOptionClick(option, i)}
              >
                {optionDisplay(option, i)}
              </div>
            );
          })}
        </div>
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

// NOTE: Component with generic & React.memo
// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/37087
export const DropdownSelect = React.memo(
  DropdownSelectBase
) as typeof DropdownSelectBase;
