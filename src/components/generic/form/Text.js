import React, { Component } from "react";
import PropTypes from "prop-types";

import InputContainer from "./InputContainer";
import SVGClipboardDocEmpty from "../svg/SVGClipboardDocEmpty";
import SVGClipboardDoc from "../svg/SVGClipboardDoc";
import { getTextFromClipboard, saveToClipboard } from "../../../util/functions";

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
    autoComplete: PropTypes.string,
    simple: PropTypes.bool,
    copy: PropTypes.bool,
    paste: PropTypes.bool,
  };

  static defaultProps = {
    type: TYPE_TEXT,
    autoComplete: "off",
    copy: false,
    paste: false,
  };

  onChange = (e) => {
    const form = {
      name: e.target.name,
      value: e.target.value,
    };

    this.props.onChange(e, form);
  };

  copyToClipboard = () => {
    saveToClipboard(this.props.value);
  };

  pasteFromClipboard = (e) => {
    getTextFromClipboard().then((value) => {
      const form = {
        name: this.props.name,
        value,
      };

      this.props.onChange(e, form);
    });
  };

  renderInput = () => {
    const { copy, paste } = this.props;
    return (
      <>
        {" "}
        <input
          className={`input-text input-border-placeholder ${this.props.className}`}
          type={this.props.type}
          name={this.props.name}
          value={this.props.value}
          maxLength={this.props.maxLength}
          onChange={this.onChange}
          onKeyDown={this.props.onKeyDown}
          disabled={this.props.disabled}
          autoComplete={this.props.autoComplete}
          ref={this.props.innerRef}
        />
        <div
          className={`absolute right-2 top-2 flex space-x-1 ${
            copy || paste ? "" : "hidden"
          }`}
        >
          {copy && (
            <div onClick={this.copyToClipboard}>
              <SVGClipboardDocEmpty className="w-4 simple-clickable" />
            </div>
          )}
          {paste && (
            <div onClick={this.pasteFromClipboard}>
              <SVGClipboardDoc className="w-4 simple-clickable" />
            </div>
          )}
        </div>
      </>
    );
  };

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
  <Text innerRef={ref} {...props} />
));
