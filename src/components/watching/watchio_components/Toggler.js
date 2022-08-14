import React, { useState } from "react";
import PropTypes from "prop-types";

import SVGArrow from "../../generic/svg/SVGArrow";

const Toggler = ({ activeText, inactiveText, children, show = false }) => {
  const [isActive, setActive] = useState(show);

  return (
    <div className="watchio-element">
      <div
        className="flex space-x-1 mb-1 justify-center cursor-pointer text-center
           font-extrabold hover:bg-theme-2/70 opacity-50 hover:opacity-100 transition ease-in duration-150"
        onClick={() => setActive(!isActive)}
      >
        <SVGArrow
          className={`w-3 ease-in duration-150 ${
            isActive ? "-rotate-90" : "rotate-90"
          }`}
        ></SVGArrow>
        <div>{isActive ? activeText : inactiveText}</div>
        <SVGArrow
          className={`w-3 ease-in duration-150 ${
            isActive ? "-rotate-90" : "rotate-90"
          }`}
        ></SVGArrow>
      </div>
      <div
        className={`w-full transition-all duration-700
        ${!isActive && "h-0 opacity-0"}
        ${isActive && "h-full opacity-100"}
      `}
      >
        {isActive && children}
      </div>
    </div>
  );
};

Toggler.propTypes = {
  activeText: PropTypes.string.isRequired,
  inactiveText: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
};

export default Toggler;
