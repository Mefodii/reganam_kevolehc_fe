import React from 'react';
import { getLogoFromLink } from '../../../util/frontend-urls';

type LinkItemProps = {
  link: string;
};

export const LinkItem = React.memo(({ link }: LinkItemProps) => {
  return (
    <a href={link}>
      <img
        src={getLogoFromLink(link)}
        alt='Placeholder'
        className='object-center'
        draggable='false'
      />
    </a>
  );
});
