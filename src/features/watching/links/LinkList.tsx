import LinkItem from './LinkItem';

type LinkListProps = {
  links: string[];
};

const LinkList: React.FC<LinkListProps> = ({ links }) => {
  if (links.length === 0) return <></>;

  return (
    <div className='mt-1 flex space-x-3'>
      {links.map((link, i) => (
        <LinkItem key={i} link={link}></LinkItem>
      ))}
    </div>
  );
};

export default LinkList;
