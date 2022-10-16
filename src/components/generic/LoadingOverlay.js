import React from "react";
import PropTypes from "prop-types";
import SVGLoading from "./svg/SVGLoading";

const LoadingOverlay = (props) => {
  if (!props.loading) return <></>;

  return (
    <div
      className={`absolute bg-gray-600 opacity-70 blur-sm rounded-lg h-full w-full text-center flex items-center justify-center z-30 ${props.className}`}
    >
      <SVGLoading className={`${props.svgSize} animate-spin`}></SVGLoading>
    </div>
  );
};

LoadingOverlay.propTypes = {
  loading: PropTypes.bool.isRequired,
  className: PropTypes.string,
  svgSize: PropTypes.string,
};

LoadingOverlay.defaultProps = {
  svgSize: "w-16",
  className: "",
};

export default LoadingOverlay;
