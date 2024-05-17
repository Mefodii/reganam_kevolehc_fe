import { isEmpty } from 'lodash';
import { PropsWithChildren } from 'react';

export type InputContainerProps = {
  label?: string;
  error?: string;
  className?: string;
};

const InputContainer: React.FC<PropsWithChildren<InputContainerProps>> = ({
  label,
  error,
  className = '',
  children,
}) => {
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
};

export default InputContainer;
