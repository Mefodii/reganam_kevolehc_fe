import React from 'react';
import { getTextFromClipboard, saveToClipboard } from '../../util/functions';

import InputContainer, { InputContainerProps } from './InputContainer';
import { SVGClipboardDocEmpty, SVGClipboardDoc } from '../svg';

export enum TEXT_INPUT_TYPE {
  TEXT = 'text',
  PASSWORD = 'password',
  EMAIL = 'email',
}

export type TextProps = InputContainerProps & {
  name: string;
  value: string;
  type?: TEXT_INPUT_TYPE;
  maxLength?: number;
  disabled?: boolean;
  autoComplete?: 'on' | 'off';
  copy?: boolean;
  paste?: boolean;
  simple?: boolean;
  containerClassName?: string;
  onChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.MouseEvent<HTMLDivElement, MouseEvent>,
    payload: Form.Payload<string>
  ) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
};

const Text = React.forwardRef(
  (
    {
      label,
      error,
      className,
      // ^ InputContainerProps
      name,
      value,
      type = TEXT_INPUT_TYPE.TEXT,
      maxLength,
      disabled,
      autoComplete = 'off',
      copy = false,
      paste = false,
      simple,
      containerClassName,
      onChange,
      onKeyDown,
      onBlur,
    }: TextProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
      const { name, value } = e.target;
      onChange(e, { name, value });
    };

    const copyToClipboard = () => {
      value && saveToClipboard(value);
    };

    const pasteFromClipboard: React.MouseEventHandler<HTMLDivElement> = (e) => {
      getTextFromClipboard().then((value) => {
        onChange(e, { name, value });
      });
    };

    const renderInput = () => {
      return (
        <>
          <input
            ref={ref}
            className={`input-text input-border-placeholder ${className}`}
            type={type}
            name={name}
            value={value}
            maxLength={maxLength}
            onChange={onInputChange}
            onKeyDown={onKeyDown}
            onBlur={onBlur}
            disabled={disabled}
            autoComplete={autoComplete}
          />
          <div
            className={`absolute right-2 top-2 flex space-x-1 ${
              copy || paste ? '' : 'hidden'
            }`}
          >
            {copy && (
              <div onClick={copyToClipboard}>
                <SVGClipboardDocEmpty className='w-4 simple-clickable' />
              </div>
            )}
            {paste && (
              <div onClick={pasteFromClipboard}>
                <SVGClipboardDoc className='w-4 simple-clickable' />
              </div>
            )}
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

export default React.memo(Text) as typeof Text;
