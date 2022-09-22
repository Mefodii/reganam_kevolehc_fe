import React from "react";
import PropTypes from "prop-types";
import SVGLoading from "./svg/SVGLoading";

const Loading = (props) => {
  return (
    <SVGLoading
      className={`w-5 animate-spin ${props.loading ? "" : "hidden"}`}
    ></SVGLoading>
  );
};

Loading.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default Loading;
