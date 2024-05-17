import { forwardRef, useState } from 'react';

import InputContainer, { InputContainerProps } from './InputContainer';
import Options from './Options';

export type DropdownSelectProps = InputContainerProps & {
  name: string;
  value?: string;
  placeholder?: string;
  hideOnChange?: boolean;
  disabled?: boolean;
  deselect?: boolean;
  simple?: boolean;
  options: Form.Option[];
  optionDisplay?: (option: Form.Option, i?: number) => string;
  optionClassName?: string;
  optionContainerClassName?: string;
  containerClassName?: string;
  onChange: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    payload: Form.Payload<Form.Option>
  ) => void;
};

const DropdownSelect = forwardRef<HTMLDivElement, DropdownSelectProps>(
  (
    {
      label,
      error,
      className = '',
      // ^ InputContainerProps
      name,
      value,
      placeholder,
      hideOnChange = true,
      disabled,
      deselect,
      simple,
      options,
      optionDisplay = (option, i) => option,
      optionClassName,
      optionContainerClassName,
      containerClassName,
      onChange,
    },
    ref
  ) => {
    const [showOptions, setShowOptions] = useState(false);

    const isSelected = () => options.includes(value || '');

    const onOptionClick = (
      e: React.MouseEvent<HTMLDivElement, MouseEvent>,
      option: Form.Option
    ) => {
      if (option !== value) {
        onInputChange(e, { name, value: option });
      }

      if (option === value && deselect) {
        onInputChange(e, { name, value: undefined });
      }
    };

    const onInputChange = (
      e: React.MouseEvent<HTMLDivElement, MouseEvent>,
      payload: Form.Payload<Form.Option>
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
          ref={ref}
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
          <Options
            className={optionContainerClassName}
            optionClassName={optionClassName}
            options={options}
            optionDisplay={optionDisplay}
            onClick={onOptionClick}
            show={!optionsHidden}
          />
        </div>
      );
    };

    if (simple) return renderInput();

    return (
      <InputContainer
        label={label}
        error={error}
        className={containerClassName}
      >
        {renderInput()}
      </InputContainer>
    );
  }
);

export default DropdownSelect;
