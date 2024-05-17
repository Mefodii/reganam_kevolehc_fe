import { SVGLoading } from '../svg';

type LoadingOverlayProps = {
  loading: boolean;
  className?: string;
  svgSize?: string;
};

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  loading,
  className = '',
  svgSize = 'w-16',
}) => {
  if (!loading) return <></>;

  return (
    <div
      className={`absolute bg-gray-600 opacity-70 blur-sm rounded-lg h-full w-full text-center flex items-center justify-center z-30 ${className}`}
    >
      <SVGLoading className={`${svgSize} animate-spin`}></SVGLoading>
    </div>
  );
};

export default LoadingOverlay;
