import PropTypes from 'prop-types';
import React, { Component } from 'react';

class SidepanelElement extends Component {
  static propTypes = {
    className: PropTypes.string,
    isSelected: PropTypes.bool,
    onClick: PropTypes.func,
  };

  static defaultProps = {
    className: '',
    isSelected: false,
    onClick: () => {},
  };

  render() {
    const { className, isSelected, onClick, children } = this.props;
    return (
      <div
        className={`side-panel-el ${
          isSelected && 'side-panel-el-active'
        } ${className}`}
        onClick={isSelected ? undefined : onClick}
      >
        {children}
      </div>
    );
  }
}

export default SidepanelElement;
