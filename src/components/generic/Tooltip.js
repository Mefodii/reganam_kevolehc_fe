import React from 'react';
import PropTypes from 'prop-types';

const Tooltip = ({ text, hidden = true, className = '' }) => {
  if (!text) return <></>;

  return (
    <div className={`tooltip ${hidden ? 'scale-0' : 'scale-100'} ${className}`}>
      {text}
    </div>
  );
};

Tooltip.propTypes = {
  hidden: PropTypes.bool,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  className: PropTypes.string,
};

export default Tooltip;
