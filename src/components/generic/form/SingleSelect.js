import React, { Component } from "react";
import PropTypes from "prop-types";

import InputContainer from "./InputContainer";

export class SingleSelect extends Component {
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
    this.props.onClick(e);
  };

  render() {
    return (
      <InputContainer
        label={this.props.label}
        error={this.props.error}
        className={this.props.containerClassName}
      >
        <div
          className={`option-single 
          ${this.props.value && "option-selected"}
          ${this.props.disabled && "option-disabled"}
          ${this.props.className}
          `}
          onClick={this.onClick}
        >
          {this.props.text}
        </div>
      </InputContainer>
    );
  }
}

export default SingleSelect;
