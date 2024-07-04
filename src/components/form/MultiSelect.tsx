import React from 'react';
import InputContainer, { InputContainerProps } from './InputContainer';
import { SVGCheckCircle, SVGXCircle } from '../svg';

export type MultiSelectProps<T> = InputContainerProps & {
  name: string;
  value: Form.Option<T>[];
  disabled?: boolean;
  simple?: boolean;
  options: Form.Option<T>[];
  optionDisplay?: (option: Form.Option<T>, i?: number) => string;
  containerClassName?: string;
  onChange: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    payload: Form.Payload<Form.Option<T>[]>
  ) => void;
};

const MultiSelect = <T,>({
  label,
  error,
  className = '',
  // ^ InputContainerProps
  name,
  value,
  disabled,
  simple,
  options,
  optionDisplay = (option: Form.Option<T>) => option + '',
  containerClassName,
  onChange,
}: MultiSelectProps<T>) => {
  const select =
    (option: Form.Option<T>): React.MouseEventHandler<HTMLDivElement> =>
    (e) => {
      handleChange(e, [...value, option]);
    };

  const deselect =
    (option: Form.Option<T>): React.MouseEventHandler<HTMLDivElement> =>
    (e) => {
      handleChange(
        e,
        value.filter((item) => item !== option)
      );
    };

  const selectAll: React.MouseEventHandler<HTMLDivElement> = (e) => {
    handleChange(e, options);
  };

  const deselectAll: React.MouseEventHandler<HTMLDivElement> = (e) => {
    handleChange(e, []);
  };

  const handleChange = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    value: Form.Option<T>[]
  ) => {
    onChange(e, { name, value });
  };

  const isOptionSelected = (option: Form.Option<T>) => value.includes(option);

  const renderButtons = () => {
    return (
      <div
        className={`flex flex-col justify-center absolute right-2 h-full top-0 space-y-1`}
      >
        <SVGCheckCircle
          className='w-5 simple-clickable-1'
          onClick={selectAll}
          disabled={disabled}
        />
        <SVGXCircle
          className='w-5 simple-clickable-1'
          onClick={deselectAll}
          disabled={disabled}
        />
      </div>
    );
  };

  const renderOptions = () => {
    return options.map((option, i) => {
      const isSelected = isOptionSelected(option);
      const handleClick = isSelected ? deselect(option) : select(option);

      return (
        <div
          key={i}
          className={`option-inline ${isSelected && 'option-selected'} ${
            disabled && !isSelected && 'option-disabled'
          } ${disabled && isSelected && 'option-selected-disabled'}
            `}
          onClick={disabled ? undefined : handleClick}
        >
          {optionDisplay(option)}
        </div>
      );
    });
  };

  const renderInput = () => {
    return (
      <div className={`input-multi-options ${className}`}>
        {renderButtons()}
        {renderOptions()}
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

export default React.memo(MultiSelect) as typeof MultiSelect;
