import { forwardRef } from 'react';

import { getToday } from '../../util/functions';

import { SVGCalendar } from '../svg';
import InputContainer, { InputContainerProps } from './InputContainer';

export type DateProps = InputContainerProps & {
  name: string;
  value?: string;
  maxLength?: number;
  disabled?: boolean;
  autoComplete?: 'on' | 'off';
  simple?: boolean;
  containerClassName?: string;
  onChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.MouseEvent<HTMLDivElement, MouseEvent>,
    payload: { name: string; value?: string }
  ) => void;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
};

const Date = forwardRef<HTMLInputElement, DateProps>(
  (
    {
      label,
      error,
      className,
      // ^ InputContainerProps
      name,
      value,
      maxLength = 10,
      disabled,
      autoComplete = 'off',
      simple,
      containerClassName,
      onChange,
      onKeyDown,
    },
    ref
  ) => {
    const setToday: React.MouseEventHandler<HTMLDivElement> = (e) => {
      onChange(e, { name, value: getToday() });
    };

    const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
      onChange(e, { name, value: e.target.value });
    };

    const renderInput = () => {
      return (
        <>
          <input
            className={`input-text input-border-placeholder ${className}`}
            type='text'
            name={name}
            value={value || ''}
            maxLength={maxLength}
            onChange={onInputChange}
            onKeyDown={onKeyDown}
            disabled={disabled}
            autoComplete={autoComplete}
            ref={ref}
          />
          <div
            className={`absolute right-2 top-1 ${disabled ? 'hidden' : ''}`}
            onClick={setToday}
          >
            <SVGCalendar className='w-6 simple-clickable'></SVGCalendar>
          </div>
        </>
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

export default Date;
