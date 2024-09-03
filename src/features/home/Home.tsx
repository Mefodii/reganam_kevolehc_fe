import React from 'react';

export const Home = React.memo(() => {
  return (
    <div className='flex-1'>
      <div className='p-5 text-2xl font-semibold text-center'>
        <div>Probably the most awesome home page</div>
        <div>...once it's finished</div>
      </div>
    </div>
  );
});
