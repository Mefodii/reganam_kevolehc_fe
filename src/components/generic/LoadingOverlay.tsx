import React from 'react';
import { SVGLoading } from '../svg';

type LoadingOverlayProps = {
  loading?: boolean;
  className?: string;
  svgSize?: string;
};

export const LoadingOverlay = React.memo(
  ({
    loading = true,
    className = '',
    svgSize = 'w-16',
  }: LoadingOverlayProps) => {
    if (!loading) return <></>;

    // TODO: (L) - have H & W be the size of the parent
    return (
      <div
        className={`absolute bg-gray-600 opacity-70 blur-sm rounded-lg h-full w-full text-center flex items-center justify-center z-30 ${className}`}
      >
        <SVGLoading className={`${svgSize} animate-spin`}></SVGLoading>
      </div>
    );
  }
);
