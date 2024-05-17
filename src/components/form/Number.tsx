import { forwardRef, useState } from 'react';

import { SVGArrow } from '../svg';
import InputContainer, { InputContainerProps } from './InputContainer';

export type NumberProps = InputContainerProps & {
  name: string;
  value?: number;
  minmax?: [number, number];
  disabled?: boolean;
  autoComplete?: 'on' | 'off';
  hideArrows?: boolean;
  simple?: boolean;
  containerClassName?: string;
  onChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.MouseEvent<HTMLDivElement, MouseEvent>,
    payload: Form.Payload<number>
  ) => void;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
};

const Number = forwardRef<HTMLInputElement, NumberProps>(
  (
    {
      label,
      error,
      className,
      // ^ InputContainerProps
      name,
      value,
      minmax = [undefined, undefined],
      disabled,
      autoComplete = 'off',
      hideArrows,
      simple,
      containerClassName,
      onChange,
      onKeyDown,
    },
    ref
  ) => {
    const [focus, setFocus] = useState(false);

    const onArrowClick = (
      e: React.MouseEvent<HTMLDivElement, MouseEvent>,
      i: number
    ) => {
      const newValue = value || 0;
      if (isInBounds(newValue)) onChange(e, { name, value: newValue });
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value, valueAsNumber } = e.target;
      if (
        value === '' ||
        (!isNaN(valueAsNumber) && isInBounds(valueAsNumber))
      ) {
        onChange(e, { name, value: valueAsNumber || undefined });
      }
    };

    const isInBounds = (value: number): boolean => {
      const [min, max] = minmax;
      return (
        (min === undefined || value >= min) &&
        (max === undefined || value <= max)
      );
    };

    const onFocus = () => setFocus(true);
    const onBlur = () => setFocus(false);

    const renderArrows = () => {
      return (
        <div
          className={`flex flex-col justify-center absolute right-2 h-full top-0 space-y-1 ${
            focus ? 'scale-100' : 'scale-0'
          } group-hover:scale-100 ease-in duration-100`}
        >
          <div onClick={(e) => onArrowClick(e, 1)}>
            <SVGArrow className='w-3 -rotate-90 simple-clickable'></SVGArrow>
          </div>
          <div onClick={(e) => onArrowClick(e, -1)}>
            <SVGArrow className='w-3 rotate-90 simple-clickable'></SVGArrow>
          </div>
        </div>
      );
    };

    const renderInput = () => {
      return (
        <div className='group' onFocus={onFocus} onBlur={onBlur}>
          <input
            className={`input-text text-center input-border-placeholder ${className}`}
            type='number'
            name={name}
            onChange={onInputChange}
            onKeyDown={onKeyDown}
            value={value || ''}
            disabled={disabled}
            autoComplete={autoComplete}
            ref={ref}
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

export default Number;
