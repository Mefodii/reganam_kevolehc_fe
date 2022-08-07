import React, { Component } from "react";
import PropTypes from "prop-types";

import InputContainer from "./InputContainer";

export const TYPE_TEXT = "text";
export const TYPE_PASSWORD = "password";
export const TYPE_EMAIL = "email";

export class Text extends Component {
  static propTypes = {
    error: PropTypes.string,
    label: PropTypes.string,
    containerClassName: PropTypes.string,
    //
    className: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    maxLength: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    onKeyDown: PropTypes.func,
    disabled: PropTypes.bool,
  };

  render() {
    const { type = TYPE_TEXT } = this.props;
    return (
      <InputContainer
        label={this.props.label}
        error={this.props.error}
        className={this.props.containerClassName}
      >
        <input
          className={`input-text input-border-placeholder ${this.props.className}`}
          type={type}
          name={this.props.name}
          value={this.props.value}
          maxLength={this.props.maxLength}
          onChange={this.props.onChange}
          onKeyDown={this.props.onKeyDown}
          disabled={this.props.disabled}
        />
      </InputContainer>
    );
  }
}

export default Text;
