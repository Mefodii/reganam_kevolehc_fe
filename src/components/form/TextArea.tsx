import React, { useRef } from 'react';

import { getTextFromClipboard, saveToClipboard } from '../../util/functions';

import InputContainer, { InputContainerProps } from './InputContainer';
import { SVGClipboardDocEmpty, SVGClipboardDoc } from '../svg';
import { useAutosizeTextArea } from '../../hooks';

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

const TextArea: React.FC<TextAreaProps> = ({
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
}) => {
  const ref = useRef<HTMLTextAreaElement>(null);
  useAutosizeTextArea(ref.current, value, autoSize);

  const onInputChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    const { name, value } = e.target;
    onChange(e, { name, value: value || '' });
  };

  const copyToClipboard = () => {
    saveToClipboard(value);
  };

  const pasteFromClipboard: React.MouseEventHandler<HTMLDivElement> = (e) => {
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
          onChange={onInputChange}
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
    <InputContainer label={label} error={error} className={containerClassName}>
      {renderInput()}
    </InputContainer>
  );
};

export default TextArea;
