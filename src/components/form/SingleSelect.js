import React, { Component } from 'react';
import PropTypes from 'prop-types';

import InputContainer from './InputContainer';

class SingleSelect extends Component {
  static propTypes = {
    error: PropTypes.string,
    label: PropTypes.string,
    containerClassName: PropTypes.string,
    //
    className: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
  };

  onClick = (e) => {
    e.target.name = this.props.name;
    e.target.value = !this.props.value;

    const form = {
      name: e.target.name,
      value: e.target.value,
    };

    this.props.onClick(e, form);
  };

  renderInput() {
    return (
      <div
        className={`option-single 
          ${this.props.value && 'option-selected'}
          ${this.props.disabled && 'option-disabled'}
          ${this.props.className}
          `}
        onClick={this.onClick}
        ref={this.props.innerRef}
      >
        {this.props.text}
      </div>
    );
  }

  render() {
    if (this.props.simple) return this.renderInput();

    return (
      <InputContainer
        label={this.props.label}
        error={this.props.error}
        className={this.props.containerClassName}
      >
        {this.renderInput()}
      </InputContainer>
    );
  }
}

export default React.forwardRef((props, ref) => (
  <SingleSelect innerRef={ref} {...props} />
));
