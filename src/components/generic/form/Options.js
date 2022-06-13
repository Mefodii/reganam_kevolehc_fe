import React, { Component } from "react";
import PropTypes from "prop-types";

export class Options extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    value: PropTypes.any,
    valueAttrName: PropTypes.string,
    onChange: PropTypes.func.isRequired,
  };

  state = {
    options: [],
  };

  onClick = (option) => (e) => {
    const isSelected = this.isOptionSelected(option);
    const newValue = isSelected
      ? this.props.value.filter((item) => item !== option)
      : [...this.props.value, option];

    e.target.name = this.props.name;
    e.target.value = newValue;
    this.props.onChange(e);
  };

  isOptionSelected = (option) => {
    return this.props.value.find((item) => item === option);
  };

  render() {
    const { options, valueAttrName } = this.props;

    return (
      <div className="input-multi-options">
        {options.map((option, i) => {
          const value = valueAttrName ? option[valueAttrName] : option;
          return (
            <div
              key={i}
              className={`option-inline click-transition ${
                this.isOptionSelected(option) && "option-selected"
              }`}
              onClick={this.onClick(option)}
            >
              {value}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Options;
