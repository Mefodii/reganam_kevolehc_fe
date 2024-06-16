import React, { useState } from 'react';

import InputContainer, { InputContainerProps } from './InputContainer';
import { BLANK_VALUE } from '../../util/constants';

export type DropdownSelectProps<T = string> = InputContainerProps & {
  name: string;
  value?: Form.Option<T>;
  placeholder?: string;
  allow_undefined?: boolean; // TODO - implement
  hideOnChange?: boolean;
  disabled?: boolean;
  deselect?: boolean;
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
const DropdownSelect = <T,>({
  label,
  error,
  className = '',
  // ^ InputContainerProps
  name,
  value,
  placeholder = BLANK_VALUE,
  hideOnChange = true,
  disabled,
  deselect,
  simple,
  options,
  optionDisplay = (option, i) => option + '',
  optionClassName,
  optionContainerClassName,
  containerClassName,
  onChange,
}: DropdownSelectProps<T>) => {
  const [showOptions, setShowOptions] = useState(false);

  const isSelected = () => value && options.includes(value);

  const onOptionClick =
    (option: Form.Option<T>, i: number) =>
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (option !== value) {
        onInputChange(e, { name, value: option });
      }

      if (option === value && deselect) {
        onInputChange(e, { name, value: undefined });
      }
    };

  const onInputChange = (
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

export default React.memo(DropdownSelect);
