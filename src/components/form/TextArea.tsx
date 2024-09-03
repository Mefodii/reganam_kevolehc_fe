import React, { useImperativeHandle, useRef } from 'react';
import { getTextFromClipboard, saveToClipboard } from '../../util/functions';
import { SVGClipboardDoc, SVGClipboardDocEmpty } from '../svg';
import { InputContainer, InputContainerProps } from './InputContainer';

export type TextAreaProps = InputContainerProps & {
  name: string;
  value: string;
  maxLength?: number;
  rows?: number;
  disabled?: boolean;
  autoComplete?: 'on' | 'off';
  autoSize?: boolean;
  copy?: boolean;
  paste?: boolean;
  simple?: boolean;
  textMono?: boolean;
  containerClassName?: string;
  onChange: (
    e:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.MouseEvent<HTMLDivElement, MouseEvent>,
    payload: Form.Payload<string>
  ) => void;
  onKeyDown?: React.KeyboardEventHandler<HTMLTextAreaElement>;
};

export const TextArea = React.memo(
  React.forwardRef(
    (
      {
        label,
        error,
        className,
        // ^ InputContainerProps
        name,
        value,
        maxLength,
        rows = 1,
        disabled,
        autoComplete = 'off',
        autoSize = true,
        copy = false,
        paste = false,
        simple,
        textMono = false,
        containerClassName,
        onChange,
        onKeyDown,
      }: TextAreaProps,
      ref: React.ForwardedRef<HTMLTextAreaElement>
    ) => {
      const innerRef = useRef<HTMLTextAreaElement>(null);
      useImperativeHandle(ref, () => innerRef.current!, []);

      const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (
        e
      ) => {
        const { name, value } = e.target;
        onChange(e, { name, value: value || '' });
      };

      const copyToClipboard = () => {
        saveToClipboard(value);
      };

      const pasteFromClipboard: React.MouseEventHandler<HTMLDivElement> = (
        e
      ) => {
        getTextFromClipboard().then((value) => {
          onChange(e, { name, value });
        });
      };

      const renderInput = () => {
        return (
          <>
            <textarea
              className={`input-text resize-none
          ${autoSize ? 'overflow-hidden' : ''}
          ${textMono ? 'mono-font' : ''}
          ${className}
          `}
              name={name}
              value={value}
              rows={rows}
              maxLength={maxLength}
              onChange={handleChange}
              onKeyDown={onKeyDown}
              autoComplete={autoComplete}
              disabled={disabled}
              ref={ref}
            />
            <div
              className={`absolute right-2 top-2 flex space-x-1 ${
                copy || paste ? '' : 'hidden'
              }`}
            >
              {copy && (
                <SVGClipboardDocEmpty
                  className='w-4 simple-clickable-1'
                  onClick={copyToClipboard}
                />
              )}
              {paste && (
                <SVGClipboardDoc
                  className='w-4 simple-clickable-1'
                  onClick={pasteFromClipboard}
                />
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
  )
);
