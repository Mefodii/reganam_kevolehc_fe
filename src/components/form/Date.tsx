import React from 'react';
import { getNow, getToday } from '../../util/datetime';

import { SVGCalendar } from '../svg';
import InputContainer, { InputContainerProps } from './InputContainer';

export type DateProps = InputContainerProps & {
  name: string;
  value: string;
  datetime?: boolean;
  disabled?: boolean;
  autoComplete?: 'on' | 'off';
  simple?: boolean;
  containerClassName?: string;
  onChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.MouseEvent<HTMLDivElement, MouseEvent>,
    payload: Form.Payload<string>
  ) => void;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
};

const Date = React.forwardRef(
  (
    {
      label,
      error,
      className,
      // ^ InputContainerProps
      name,
      value,
      datetime = false,
      disabled,
      autoComplete = 'off',
      simple,
      containerClassName,
      onChange,
      onKeyDown,
    }: DateProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    const maxLength = datetime ? 100 : 10;

    const setNow: React.MouseEventHandler<HTMLDivElement> = (e) => {
      const newValue = datetime ? getNow() : getToday();
      onChange(e, { name, value: newValue });
    };

    const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
      onChange(e, { name, value: e.target.value });
    };

    const renderInput = () => {
      return (
        <>
          <input
            ref={ref}
            className={`input-text input-border-placeholder ${className}`}
            type='text'
            name={name}
            value={value}
            maxLength={maxLength}
            onChange={onInputChange}
            onKeyDown={onKeyDown}
            disabled={disabled}
            autoComplete={autoComplete}
          />
          <div
            className={`flex space-x-1 absolute right-2 top-1 ${
              disabled ? 'hidden' : ''
            }`}
          >
            <div onClick={setNow}>
              <SVGCalendar className='w-5 simple-clickable'></SVGCalendar>
            </div>
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

export default React.memo(Date) as typeof Date;
