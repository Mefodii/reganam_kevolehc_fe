import React, { Component } from "react";

import Btn from "./Btn";

export class Button extends Component {
  static propTypes = {
    ...Btn.propTypes,
  };

  static defaultProps = {
    ...Btn.defaultProps,
  };

  render() {
    return (
      <Btn
        className={`btn ${this.props.className}`}
        onClick={this.props.onClick}
        tooltip={this.props.tooltip}
        showTooltipDelay={this.props.showTooltipDelay}
        loading={this.props.loading}
      >
        {this.props.children}
      </Btn>
    );
  }
}

export default Button;
