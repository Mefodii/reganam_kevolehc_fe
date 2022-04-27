import React, { Component } from "react";

import Select from "./Select";
import Checkbox from "./Checkbox";
import Radio from "./Radio";
import Options from "./Options";

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
    if (type === INPUT_NUMBER) inputType = "number";

    return (
      <input
        className={`input-text ${type === INPUT_NUMBER && "text-center"}`}
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

  renderSelect = () => {
    return (
      <Select
        name={this.props.name}
        value={this.props.value}
        placeholder={this.props.placeholder}
        options={this.props.options}
        onChange={this.props.onChange}
        disabled={this.props.disabled}
      ></Select>
    );
  };

  renderCheckbox = () => {
    return (
      <Checkbox
        name={this.props.name}
        text={this.props.text}
        title={this.props.title}
        checked={this.props.checked}
        onClick={this.props.onClick}
      ></Checkbox>
    );
  };

  renderRadio = () => {
    return (
      <Radio
        name={this.props.name}
        value={this.props.value}
        options={this.props.options}
        onClick={this.props.onClick}
      ></Radio>
    );
  };

  renderOptions = () => {
    return (
      <Options
        name={this.props.name}
        value={this.props.value}
        options={this.props.options}
        onClick={this.props.onClick}
      ></Options>
    );
  };

  renderByType = () => {
    const { type } = this.props;

    if (type === INPUT_TEXT) return this.renderInput();
    if (type === INPUT_PASSWORD) return this.renderInput();
    if (type === INPUT_EMAIL) return this.renderInput();
    if (type === INPUT_NUMBER) return this.renderInput();
    if (type === INPUT_TEXTAREA) return this.renderTextarea();
    if (type === INPUT_SELECT) return this.renderSelect();
    if (type === INPUT_CHECKBOX) return this.renderCheckbox();
    if (type === INPUT_RADIO) return this.renderRadio();
    if (type === INPUT_OPTIONS) return this.renderOptions();
  };

  render() {
    const { label, error, type, showLabel = true } = this.props;
    return (
      <div className="w-full">
        <div
          className={`w-full relative ${
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
