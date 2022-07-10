import React, { Component } from "react";

export class Text extends Component {
  render() {
    return (
      <input
        className="input-text"
        type={this.props.type}
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
