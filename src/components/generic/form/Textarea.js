import React, { Component } from "react";
import PropTypes from "prop-types";

import InputContainer from "./InputContainer";

export class TextArea extends Component {
  static propTypes = {
    error: PropTypes.string,
    label: PropTypes.string,
    containerClassName: PropTypes.string,
    //
    className: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    maxLength: PropTypes.number,
    rows: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    onKeyDown: PropTypes.func,
    autoComplete: PropTypes.string,
    disabled: PropTypes.bool,
    simple: PropTypes.bool,
    autoSize: PropTypes.bool,
  };

  static defaultProps = {
    autoComplete: "off",
    rows: 1,
    autoSize: true,
  };

  textAreaRef = React.createRef();

  onChange = (e) => {
    const form = {
      name: e.target.name,
      value: e.target.value,
    };

    this.props.onChange(e, form);
  };

  autoSize = () => {
    if (!this.props.autoSize) return;

    this.textAreaRef.current.style.height = `inherit`;
    this.textAreaRef.current.style.height = `${this.textAreaRef.current.scrollHeight}px`;
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.value !== this.props.value) this.autoSize();
  }

  componentDidMount() {
    this.autoSize();
  }

  renderInput() {
    return (
      <textarea
        className={`input-text resize-none
          ${this.props.autoSize ? "overflow-hidden" : ""}
          ${this.props.className}
          `}
        type="textarea"
        name={this.props.name}
        value={this.props.value}
        rows={this.props.rows}
        maxLength={this.props.maxLength}
        onChange={this.onChange}
        onKeyDown={this.props.onKeyDown}
        autoComplete={this.props.autoComplete}
        disabled={this.props.disabled}
        ref={this.textAreaRef}
      />
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

export default TextArea;
