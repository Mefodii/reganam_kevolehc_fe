import React from 'react';
import { SVGLoading } from '../svg';

type LoadingProps = {
  loading: boolean;
};

const Loading: React.FC<LoadingProps> = ({ loading }) => {
  if (!loading) return <></>;
  return <SVGLoading className='w-5 animate-spin'></SVGLoading>;
};

export default React.memo(Loading) as typeof Loading;
