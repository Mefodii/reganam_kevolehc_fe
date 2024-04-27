import React from 'react';
import PropTypes from 'prop-types';

import { SVGLoading } from '../svg';

const LoadingOverlay = ({ loading, className = '', svgSize = 'w-16' }) => {
  if (!loading) return <></>;

  return (
    <div
      className={`absolute bg-gray-600 opacity-70 blur-sm rounded-lg h-full w-full text-center flex items-center justify-center z-30 ${className}`}
    >
      <SVGLoading className={`${svgSize} animate-spin`}></SVGLoading>
    </div>
  );
};

LoadingOverlay.propTypes = {
  loading: PropTypes.bool.isRequired,
  className: PropTypes.string,
  svgSize: PropTypes.string,
};

export default LoadingOverlay;
