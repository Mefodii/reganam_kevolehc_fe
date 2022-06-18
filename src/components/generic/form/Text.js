import React, { Component } from "react";
import { INPUT_EMAIL, INPUT_PASSWORD, INPUT_TEXT } from "./InputContainer";

export class Text extends Component {
  render() {
    let inputType = "";
    const { type } = this.props;
    if (type === INPUT_TEXT) inputType = "text";
    if (type === INPUT_PASSWORD) inputType = "password";
    if (type === INPUT_EMAIL) inputType = "email";

    return (
      <input
        className="input-text"
        type={inputType}
        name={this.props.name}
        onChange={this.props.onChange}
        onKeyDown={this.props.onKeyDown}
        value={this.props.value}
        disabled={this.props.disabled}
      />
    );
  }
}

export default Text;
