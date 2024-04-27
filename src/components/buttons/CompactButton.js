import PropTypes from 'prop-types';
import React, { Component } from 'react';

import BaseButton from './BaseButton';

class CompactButton extends Component {
  static propTypes = {
    ...BaseButton.propTypes,
    text: PropTypes.string.isRequired,
  };

  static defaultProps = {
    ...BaseButton.defaultProps,
  };

  render() {
    return (
      <BaseButton
        className={`btn-compact ${this.props.className}`}
        onClick={this.props.onClick}
        tooltip={this.props.tooltip}
        showTooltipDelay={this.props.showTooltipDelay}
        loading={this.props.loading}
      >
        {this.props.children}
        <div className={`btn-compact-text`}>{this.props.text}</div>
      </BaseButton>
    );
  }
}

export default CompactButton;
