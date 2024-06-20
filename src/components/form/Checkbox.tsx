import React from 'react';
import InputContainer, { InputContainerProps } from './InputContainer';
import { SVGCheck, SVGCross } from '../svg';

export type CheckboxProps = InputContainerProps & {
  name: string;
  checked: boolean;
  text: string;
  disabled?: boolean;
  simple?: boolean;
  containerClassName?: string;
  onChange: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    payload: Form.Payload<Form.Option<boolean>>
  ) => void;
};

const Checkbox = ({
  label,
  error,
  className = '',
  // ^ InputContainerProps
  name,
  checked,
  text,
  disabled,
  simple,
  containerClassName,
  onChange,
}: CheckboxProps) => {
  const onClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    onChange(e, { name, value: !checked });
  };

  const renderInput = () => {
    return (
      <div
        className={`option ${checked && 'option-selected'} ${
          disabled && !checked && 'option-disabled'
        } ${disabled && checked && 'option-selected-disabled'} 
          ${className}
          `}
        onClick={onClick}
      >
        {!simple && (
          <div
            className={`option-checkbox ${
              checked && 'option-checkbox-selected'
            }`}
          >
            <div className='mx-1'>
              {checked && <SVGCheck className='w-5 text-active-1' />}
              {!checked && <SVGCross className='w-5 text-active-1/20' />}
            </div>
          </div>
        )}

        <div className='w-full mx-2'>{text}</div>
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

export default React.memo(Checkbox) as typeof Checkbox;
