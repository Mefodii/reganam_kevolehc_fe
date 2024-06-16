import React from 'react';

const TContainer: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className='bg-theme-1 border border-theme-3 rounded-lg shadow-2xl shadow-active-1/5'>
      {children}
    </div>
  );
};

const THead: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className='m-5 flex text-lg font-bold border-b-2 border-active-1/80 mb-2 pb-1'>
      {children}
    </div>
  );
};

const TBody: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <div className='divide-y divide-active-1/10'>{children}</div>;
};

const Table = {
  TContainer: React.memo(TContainer),
  THead: React.memo(THead),
  TBody: React.memo(TBody),
};

export default Table;
