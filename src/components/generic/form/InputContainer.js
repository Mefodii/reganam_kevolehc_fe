import React, { Component } from "react";

import Select from "./Select";
import Checkbox from "./Checkbox";
import Radio from "./Radio";
import Options from "./Options";
import Number from "./Number";
import Date from "./Date";
import Textarea from "./Textarea";
import Text from "./Text";

export const INPUT_TEXT = "input-text";
export const INPUT_TEXTAREA = "input-textarea";
export const INPUT_DATE = "input-date";
export const INPUT_PASSWORD = "input-password";
export const INPUT_EMAIL = "input-email";
export const INPUT_NUMBER = "input-number";
export const INPUT_SELECT = "input-select";
export const INPUT_CHECKBOX = "input-checkbox";
export const INPUT_RADIO = "input-radio";
export const INPUT_OPTIONS = "input-options";

export class InputContainer extends Component {
  renderByType = () => {
    const { type } = this.props;

    if (type === INPUT_TEXT) return <Text {...this.props} />;
    if (type === INPUT_PASSWORD) return <Text {...this.props} />;
    if (type === INPUT_EMAIL) return <Text {...this.props} />;
    if (type === INPUT_NUMBER) return <Number {...this.props} />;
    if (type === INPUT_DATE) return <Date {...this.props} />;
    if (type === INPUT_TEXTAREA) return <Textarea {...this.props} />;
    if (type === INPUT_SELECT) return <Select {...this.props} />;
    if (type === INPUT_CHECKBOX) return <Checkbox {...this.props} />;
    if (type === INPUT_RADIO) return <Radio {...this.props} />;
    if (type === INPUT_OPTIONS) return <Options {...this.props} />;
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
