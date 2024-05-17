type SVGDownArrowProps = {
  className?: string;
};

const SVGDownArrow: React.FC<SVGDownArrowProps> = ({ className }) => {
  return (
    <svg
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='1'
        d='M19 9l-7 7-7-7'
      />
    </svg>
  );
};

export default SVGDownArrow;
