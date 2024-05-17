import { getLogoFromLink } from '../../../util/frontend-urls';

type LinkItemProps = {
  link: string;
};

const LinkItem: React.FC<LinkItemProps> = ({ link }) => {
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
};

export default LinkItem;
