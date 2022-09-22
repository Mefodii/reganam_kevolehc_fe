import PropTypes from "prop-types";
import React, { Component } from "react";
import Btn from "./Btn";

export class CompactButton extends Component {
  static propTypes = {
    ...Btn.propTypes,
    text: PropTypes.string.isRequired,
  };

  static defaultProps = {
    ...Btn.defaultProps,
  };

  render() {
    return (
      <Btn
        className={`btn-compact ${this.props.className}`}
        onClick={this.props.onClick}
        tooltip={this.props.tooltip}
        showTooltipDelay={this.props.showTooltipDelay}
        loading={this.props.loading}
      >
        {this.props.children}
        <div className={`btn-compact-text`}>{this.props.text}</div>
      </Btn>
    );
  }
}

export default CompactButton;
