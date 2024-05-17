import { forwardRef } from 'react';

import InputContainer, { InputContainerProps } from './InputContainer';
import { SVGCheckCircle, SVGXCircle } from '../svg';

export type MultiSelectProps = InputContainerProps & {
  name: string;
  value: Form.Option[];
  disabled?: boolean;
  simple?: boolean;
  options: Form.Option[];
  optionDisplay?: (option: Form.Option, i?: number) => string;
  containerClassName?: string;
  onChange: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    payload: Form.Payload<Form.Option[]>
  ) => void;
};

const MultiSelect = forwardRef<HTMLDivElement, MultiSelectProps>(
  (
    {
      label,
      error,
      className = '',
      // ^ InputContainerProps
      name,
      value,
      disabled,
      simple,
      options,
      optionDisplay = (option: Form.Option) => option,
      containerClassName,
      onChange,
    },
    ref
  ) => {
    const select =
      (option: Form.Option): React.MouseEventHandler<HTMLDivElement> =>
      (e) => {
        onInputChange(e, [...value, option]);
      };

    const deselect =
      (option: Form.Option): React.MouseEventHandler<HTMLDivElement> =>
      (e) => {
        onInputChange(
          e,
          value.filter((item) => item !== option)
        );
      };

    const selectAll: React.MouseEventHandler<HTMLDivElement> = (e) => {
      onInputChange(e, options);
    };

    const deselectAll: React.MouseEventHandler<HTMLDivElement> = (e) => {
      onInputChange(e, []);
    };

    const onInputChange = (
      e: React.MouseEvent<HTMLDivElement, MouseEvent>,
      value: Form.Option[]
    ) => {
      onChange(e, { name, value });
    };

    const isOptionSelected = (option: Form.Option) => value.includes(option);

    const renderButtons = () => {
      return (
        <div
          className={`flex flex-col justify-center absolute right-2 h-full top-0 space-y-1`}
        >
          <div onClick={disabled ? undefined : selectAll}>
            <SVGCheckCircle className='w-5 simple-clickable' />
          </div>
          <div onClick={disabled ? undefined : deselectAll}>
            <SVGXCircle className='w-5 simple-clickable' />
          </div>
        </div>
      );
    };

    const renderOptions = () => {
      return options.map((option, i) => {
        const isSelected = isOptionSelected(option);
        const onClick = isSelected ? deselect(option) : select(option);

        return (
          <div
            key={i}
            className={`option-inline ${isSelected && 'option-selected'} ${
              disabled && !isSelected && 'option-disabled'
            } ${disabled && isSelected && 'option-selected-disabled'}
            `}
            onClick={disabled ? undefined : onClick}
          >
            {optionDisplay(option)}
          </div>
        );
      });
    };

    const renderInput = () => {
      return (
        <div className={`input-multi-options ${className}`} ref={ref}>
          {renderButtons()}
          {renderOptions()}
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

export default MultiSelect;
