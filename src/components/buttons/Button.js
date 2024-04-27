import React, { Component } from 'react';

import BaseButton from './BaseButton';

class Button extends Component {
  static propTypes = {
    ...BaseButton.propTypes,
  };

  static defaultProps = {
    ...BaseButton.defaultProps,
  };

  render() {
    return (
      <BaseButton
        className={`btn ${this.props.className}`}
        onClick={this.props.onClick}
        tooltip={this.props.tooltip}
        showTooltipDelay={this.props.showTooltipDelay}
        loading={this.props.loading}
      >
        {this.props.children}
      </BaseButton>
    );
  }
}

export default Button;
