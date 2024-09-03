import { isEmpty } from 'lodash';
import React, { PropsWithChildren } from 'react';

export type InputContainerProps = {
  label?: string;
  error?: string;
  className?: string;
};

export const InputContainer = React.memo(
  ({
    label,
    error,
    className = '',
    children,
  }: PropsWithChildren<InputContainerProps>) => {
    const hasLabel = !isEmpty(label);

    return (
      <div className={`w-full ${className}`}>
        <div
          className={`input-container 
          ${!hasLabel && 'input-container-no-label'} 
          ${error && 'ring-error'}`}
        >
          {hasLabel && <div className='input-label'>{label}</div>}
          {children}
        </div>
        <div className='input-error'>{error}</div>
      </div>
    );
  }
);
