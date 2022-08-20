import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";

export class Button extends Component {
  static propTypes = {
    tooltip: PropTypes.string,
    className: PropTypes.string,
    showTooltipDelay: PropTypes.number,
    onClick: PropTypes.func.isRequired,
  };

  static defaultProps = {
    className: "",
    tooltip: undefined,
    showTooltipDelay: 300,
  };

  state = {
    showTooltip: false,
    showTooltipTimeoutId: null,
  };

  showTooltip = (e) => {
    if (this.state.showTooltip) return;

    const showTooltipTimeoutId = setTimeout(
      () => this.setState({ showTooltip: true, showTooltipTimeoutId: null }),
      this.props.showTooltipDelay
    );
    this.setState({ showTooltipTimeoutId });
  };

  hideTooltip = (e) => {
    if (this.state.showTooltipTimeoutId)
      clearTimeout(this.state.showTooltipTimeoutId);

    this.setState({ showTooltip: false });
  };

  render() {
    const { tooltip, className, children, onClick } = this.props;
    const { showTooltip } = this.state;
    return (
      <div
        className={`p-2 text-text-1/50 border-2 border-theme-3 relative cursor-pointer flex items-center space-x-2 hover:text-active-1/100 hover:bg-theme-3
        active:bg-theme-4
        ${className}
        `}
        onClick={onClick}
        onMouseEnter={this.showTooltip}
        onMouseLeave={this.hideTooltip}
      >
        {children}
        <div
          className={`absolute z-30 text-text-1 text-sm top-full left-1/2 -translate-x-1/2 w-max bg-theme-2 border rounded-md border-theme-3 px-2 py-1
            ${
              showTooltip ? "scale-100" : "scale-0"
            } transition origin-top ease-in duration-150`}
        >
          {tooltip}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Button);
