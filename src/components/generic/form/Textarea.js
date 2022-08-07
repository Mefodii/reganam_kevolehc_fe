import React, { Component } from "react";
import PropTypes from "prop-types";

import InputContainer from "./InputContainer";

export class Textarea extends Component {
  static propTypes = {
    error: PropTypes.string,
    label: PropTypes.string,
    containerClassName: PropTypes.string,
    //
    className: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    maxLength: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    onKeyDown: PropTypes.func,
    disabled: PropTypes.bool,
  };

  textAreaRef = React.createRef();

  onChange = (e) => {
    this.autoSize(e);
    this.props.onChange(e);
  };

  autoSize = (e) => {
    e.target.style.height = `inherit`;
    e.target.style.height = `${e.target.scrollHeight - 1}px`;
  };

  componentDidMount() {
    this.textAreaRef.current.style.heigh = `inherit`;
    this.textAreaRef.current.style.height = `${
      this.textAreaRef.current.scrollHeight - 1
    }px`;
  }

  render() {
    return (
      <InputContainer
        label={this.props.label}
        error={this.props.error}
        className={this.props.containerClassName}
      >
        <textarea
          className={`input-text overflow-hidden resize-none
          ${this.props.className}
          `}
          type="textarea"
          name={this.props.name}
          value={this.props.value}
          rows="1"
          maxLength={this.props.maxLength}
          onChange={this.onChange}
          onKeyDown={this.props.onKeyDown}
          disabled={this.props.disabled}
          ref={this.textAreaRef}
        />
      </InputContainer>
    );
  }
}

export default Textarea;
