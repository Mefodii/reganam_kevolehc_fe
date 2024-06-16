import React from 'react';

type ContentProps = React.PropsWithChildren & {
  backgroundPicture?: string;
  title?: string;
};

const ContentContainer: React.FC<ContentProps> = ({
  backgroundPicture,
  title,
  children,
}) => {
  return (
    <div className='w-full'>
      {backgroundPicture && (
        <div className='w-full opacity-20 right-0 blur-sm fixed mr-4'>
          <img
            src={backgroundPicture}
            alt='Placeholder'
            className='w-full mr-4 rounded-lg'
            draggable='false'
          />
        </div>
      )}

      <div className='w-full flex flex-col items-center relative'>
        {title && <h2 className='text-xl uppercase font-bold m-4'>{title}</h2>}

        {children}
      </div>
    </div>
  );
};

export default React.memo(ContentContainer);
