import React from 'react';

type TProps = React.PropsWithChildren &
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const TContainer: React.FC<TProps> = ({
  children,
  className = '',
  ...rest
}) => {
  return (
    <div
      className={`w-full bg-theme-1 border border-theme-3 rounded-lg shadow-2xl shadow-active-1/5 mono-font overflow-y-auto overflow-x-hidden ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
};

const THead: React.FC<TProps> = ({ children, className = '', ...rest }) => {
  return (
    <div className='sticky top-0 bg-inherit z-10'>
      <div
        className={`mx-5 mb-2 pb-3 pt-5 flex items-center justify-between text-lg font-bold border-b-2 border-active-1/80 ${className}`}
        {...rest}
      >
        {children}
      </div>
    </div>
  );
};

const TBody: React.FC<TProps> = ({ children, className = '', ...rest }) => {
  return (
    <div className={`divide-y divide-active-1/10 ${className}`} {...rest}>
      {children}
    </div>
  );
};

const TRow: React.FC<TProps> = ({ children, className, ...rest }) => {
  return (
    <div
      className={`flex justify-between items-center px-5 py-3 hover:bg-theme-3/50 ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
};

const Table = {
  TContainer: React.memo(TContainer) as typeof TContainer,
  THead: React.memo(THead) as typeof THead,
  TBody: React.memo(TBody) as typeof TBody,
  TRow: React.memo(TRow) as typeof TRow,
};

export default Table;
