import React, { Component } from "react";

export class Checkbox extends Component {
  onClick = (e) => {
    e.target.name = this.props.name;
    e.target.value = !this.props.checked;
    this.props.onClick(e);
  };

  render() {
    const { checked, text, title } = this.props;
    return (
      <div
        className={`option click-transition ${checked && "option-selected"}`}
        title={title}
        onClick={this.onClick}
      >
        {text}
      </div>
    );
  }
}

export default Checkbox;
