import { SVGLoading } from '../svg';

type LoadingProps = {
  loading: boolean;
};

const Loading: React.FC<LoadingProps> = (props) => {
  return (
    <SVGLoading
      className={`w-5 animate-spin ${props.loading ? '' : 'hidden'}`}
    ></SVGLoading>
  );
};

export default Loading;
