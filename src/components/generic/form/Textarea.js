import React, { Component } from "react";

export class Textarea extends Component {
  autoSize = (e) => {
    e.target.style.height = `inherit`;
    e.target.style.height = `${e.target.scrollHeight}px`;
    this.props.onChange(e);
  };

  render() {
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
  }
}

export default Textarea;
