import React from "react";
import PropTypes from "prop-types";

const VideoItemPlaceholder = (props) => {
  if (!props.show) return <></>;

  return (
    <div
      className={`h-14 p-2 border-2 shadow-2xl rounded-xl bg-theme-2 border-theme-5 ${props.className}`}
    ></div>
  );
};

VideoItemPlaceholder.propTypes = {
  show: PropTypes.bool.isRequired,
};

export default VideoItemPlaceholder;
