import React, { Component } from "react";

import { OPTION_SELECTED } from "../../../util/cssUtils";

export class Options extends Component {
  onClick = (option) => (e) => {
    const isSelected = this.isOptionSelected(option);
    const newValue = isSelected
      ? this.props.value.filter((item) => item.id !== option.id)
      : [...this.props.value, option];
    newValue.sort((a, b) => a.id - b.id);

    e.target.name = this.props.name;
    e.target.value = newValue;
    this.props.onClick(e);
  };

  isOptionSelected = (option) => {
    return this.props.value.find((item) => item.id === option.id);
  };

  render() {
    return (
      <div className="input-multi-options">
        {this.props.options.map((option) => (
          <div
            key={option.id}
            className={`option-inline click-transition ${
              this.isOptionSelected(option) && OPTION_SELECTED
            }`}
            value={option.id}
            onClick={this.onClick(option)}
          >
            {option.name}
          </div>
        ))}
      </div>
    );
  }
}

export default Options;
