import React, { useState } from 'react';

import { SVGArrow } from '../svg';
import InputContainer, { InputContainerProps } from './InputContainer';

export type NumberProps = InputContainerProps & {
  name: string;
  value: number | null;
  min?: number;
  max?: number;
  disabled?: boolean;
  autoComplete?: 'on' | 'off';
  hideArrows?: boolean;
  simple?: boolean;
  containerClassName?: string;
  onChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.MouseEvent<HTMLDivElement, MouseEvent>,
    payload: Form.Payload<number | null>
  ) => void;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
};

const Number = React.forwardRef(
  (
    {
      label,
      error,
      className,
      // ^ InputContainerProps
      name,
      value,
      min = undefined,
      max = undefined,
      disabled,
      autoComplete = 'off',
      hideArrows,
      simple,
      containerClassName,
      onChange,
      onKeyDown,
    }: NumberProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    const [focus, setFocus] = useState(false);

    const isInBounds = (value: number): boolean => {
      return (
        (min === undefined || value >= min) &&
        (max === undefined || value <= max)
      );
    };

    const onArrowClick = (
      e: React.MouseEvent<HTMLDivElement, MouseEvent>,
      mod: number
    ) => {
      const newValue = (value || 0) + mod;
      if (isInBounds(newValue)) onChange(e, { name, value: newValue });
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value, valueAsNumber } = e.target;
      if (
        value === '' ||
        (!isNaN(valueAsNumber) && isInBounds(valueAsNumber))
      ) {
        onChange(e, {
          name,
          value: value === '' ? null : valueAsNumber,
        });
      }
    };

    const renderArrows = () => {
      return (
        <div
          className={`flex flex-col justify-center absolute right-2 h-full top-0 space-y-1 ${
            focus ? 'scale-100' : 'scale-0'
          } group-hover:scale-100 ease-in duration-100`}
        >
          <SVGArrow
            className='w-3 -rotate-90 simple-clickable-1'
            onClick={(e) => onArrowClick(e, 1)}
          ></SVGArrow>
          <SVGArrow
            className='w-3 rotate-90 simple-clickable-1'
            onClick={(e) => onArrowClick(e, -1)}
          ></SVGArrow>
        </div>
      );
    };

    const renderInput = () => {
      return (
        <div
          className='group'
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        >
          <input
            ref={ref}
            className={`input-text text-center input-border-placeholder ${className}`}
            type='number'
            name={name}
            onChange={onInputChange}
            onKeyDown={onKeyDown}
            value={value ?? ''}
            disabled={disabled}
            autoComplete={autoComplete}
          />
          {!hideArrows && !disabled && renderArrows()}
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

export default React.memo(Number) as typeof Number;
