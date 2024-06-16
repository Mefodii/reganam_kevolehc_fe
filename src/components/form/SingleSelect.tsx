import React from 'react';
import InputContainer, { InputContainerProps } from './InputContainer';

export type SingleSelectProps<T = boolean> = InputContainerProps & {
  name: string;
  value: Form.Option<T>;
  text: string;
  disabled?: boolean;
  simple?: boolean;
  optionSelected?: Form.Option<T>;
  optionDeselected?: Form.Option<T>;
  containerClassName?: string;
  onChange: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    payload: Form.Payload<Form.Option<T>>
  ) => void;
};

const SingleSelect = ({
  label,
  error,
  className = '',
  // ^ InputContainerProps
  name,
  value,
  text,
  disabled,
  simple,
  optionSelected = true,
  optionDeselected = false,
  containerClassName,
  onChange,
}: SingleSelectProps) => {
  const onClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const newValue =
      value === optionSelected ? optionDeselected : optionSelected;
    onChange(e, { name, value: newValue });
  };

  const renderInput = () => {
    const isSelected = value === optionSelected;
    return (
      <div
        className={`option-single  ${isSelected && 'option-selected'} ${
          disabled && !isSelected && 'option-disabled'
        } ${disabled && isSelected && 'option-selected-disabled'} 
          ${className}
          `}
        onClick={onClick}
      >
        {text}
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

export default React.memo(SingleSelect);
