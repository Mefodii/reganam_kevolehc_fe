import React from 'react';
import { SVGLoading } from '../svg';

type LoadingProps = {
  loading: boolean;
};

export const Loading = React.memo(({ loading }: LoadingProps) => {
  if (!loading) return <></>;
  return <SVGLoading className='w-5 animate-spin' />;
});
