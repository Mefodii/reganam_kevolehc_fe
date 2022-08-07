import React, { Component } from "react";
import PropTypes from "prop-types";

import InputContainer from "./InputContainer";

export class MultiSelect extends Component {
  static propTypes = {
    error: PropTypes.string,
    label: PropTypes.string,
    containerClassName: PropTypes.string,
    //
    className: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.array.isRequired,
    options: PropTypes.array.isRequired,
    optionDisplay: PropTypes.func,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
  };

  select = (option) => (e) => {
    e.target.name = this.props.name;
    e.target.value = [...this.props.value, option];
    this.props.onChange(e);
  };

  deselect = (option) => (e) => {
    e.target.name = this.props.name;
    e.target.value = this.props.value.filter((item) => item !== option);
    this.props.onChange(e);
  };

  isOptionSelected = (option) => {
    return this.props.value.find((item) => item === option);
  };

  render() {
    const { optionDisplay = (option) => option, disabled } = this.props;

    return (
      <InputContainer
        label={this.props.label}
        error={this.props.error}
        className={this.props.containerClassName}
      >
        <div className={`input-multi-options ${this.props.className}`}>
          {this.props.options.map((option, i) => {
            const isSelected = this.isOptionSelected(option);
            const onClick = isSelected
              ? this.deselect(option)
              : this.select(option);

            return (
              <div
                key={i}
                className={`option-inline
                ${isSelected && "option-selected"}
                ${disabled && "option-disabled"}
                `}
                onClick={disabled ? null : onClick}
              >
                {optionDisplay(option)}
              </div>
            );
          })}
        </div>
      </InputContainer>
    );
  }
}

export default MultiSelect;
