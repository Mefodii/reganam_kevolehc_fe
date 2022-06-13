import React, { Component } from "react";

import Select from "./Select";
import Checkbox from "./Checkbox";
import Radio from "./Radio";
import Options from "./Options";
import Number from "./Number";

export const INPUT_TEXT = "input-text";
export const INPUT_TEXTAREA = "input-textarea";
export const INPUT_PASSWORD = "input-password";
export const INPUT_EMAIL = "input-email";
export const INPUT_NUMBER = "input-number";
export const INPUT_SELECT = "input-select";
export const INPUT_CHECKBOX = "input-checkbox";
export const INPUT_RADIO = "input-radio";
export const INPUT_OPTIONS = "input-options";

export class InputContainer extends Component {
  renderInput = () => {
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
  };

  autoSize = (e) => {
    e.target.style.height = `inherit`;
    e.target.style.height = `${e.target.scrollHeight}px`;
    this.props.onChange(e);
  };

  renderTextarea = () => {
    return (
      <textarea
        className={`input-text overflow-hidden resize-none`}
        type="textarea"
        name={this.props.name}
        onChange={this.autoSize}
        onKeyDown={this.props.onKeyDown}
        value={this.props.value}
        disabled={this.props.disabled}
        rows="1"
        maxLength={this.props.maxLength}
      />
    );
  };

  renderByType = () => {
    const { type } = this.props;

    if (type === INPUT_TEXT) return this.renderInput();
    if (type === INPUT_PASSWORD) return this.renderInput();
    if (type === INPUT_EMAIL) return this.renderInput();
    if (type === INPUT_NUMBER) return <Number {...this.props} />;
    if (type === INPUT_TEXTAREA) return this.renderTextarea();
    if (type === INPUT_SELECT) return <Select {...this.props}></Select>;
    if (type === INPUT_CHECKBOX) return <Checkbox {...this.props}></Checkbox>;
    if (type === INPUT_RADIO) return <Radio {...this.props}></Radio>;
    if (type === INPUT_OPTIONS) return <Options {...this.props}></Options>;
  };

  render() {
    const { label, error, type, showLabel = true, className = "" } = this.props;
    return (
      <div className={`w-full ${className}`}>
        <div
          className={`w-full h-full relative ${
            showLabel ? "pb-2 pt-6" : "py-4"
          } px-3 border-b-2 bg-tertiary border-primary ${
            error && "ring-error"
          }`}
        >
          {showLabel && <div className="input-label">{label}</div>}
          {type && this.renderByType()}
          {this.props.children}
        </div>
        <div className="input-error">{error}</div>
      </div>
    );
  }
}

export default InputContainer;
