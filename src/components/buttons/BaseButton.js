import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { Loading, Tooltip } from '../generic';

class BaseButton extends Component {
  static propTypes = {
    tooltip: Tooltip.propTypes.text,
    className: PropTypes.string,
    loading: PropTypes.bool,
    showTooltipDelay: PropTypes.number,
    onClick: PropTypes.func,
  };

  static defaultProps = {
    className: '',
    loading: false,
    showTooltipDelay: 150,
    onClick: () => {},
  };

  state = {
    showTooltip: false,
    showTooltipTimeoutId: null,
  };

  showTooltip = (e) => {
    if (!this.props.tooltip) return;
    if (this.state.showTooltip) return;

    const showTooltipTimeoutId = setTimeout(
      () => this.setState({ showTooltip: true, showTooltipTimeoutId: null }),
      this.props.showTooltipDelay
    );
    this.setState({ showTooltipTimeoutId });
  };

  hideTooltip = (e) => {
    if (!this.props.tooltip) return;
    if (this.state.showTooltipTimeoutId)
      clearTimeout(this.state.showTooltipTimeoutId);

    this.setState({ showTooltip: false });
  };

  render() {
    const { tooltip, className, children, onClick, loading } = this.props;
    const { showTooltip } = this.state;
    return (
      <div
        className={`btn-base ${className}`}
        onClick={onClick}
        onMouseEnter={this.showTooltip}
        onMouseLeave={this.hideTooltip}
      >
        {children}
        <Loading loading={loading} />
        <Tooltip text={tooltip} hidden={!showTooltip} />
      </div>
    );
  }
}

export default BaseButton;
