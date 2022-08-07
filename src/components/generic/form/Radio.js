import React, { Component } from "react";
import PropTypes from "prop-types";

import InputContainer from "./InputContainer";

export class Radio extends Component {
  static propTypes = {
    error: PropTypes.string,
    label: PropTypes.string,
    containerClassName: PropTypes.string,
    //
    className: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.any,
    options: PropTypes.array.isRequired,
    optionDisplay: PropTypes.func,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
  };

  select = (option) => (e) => {
    e.target.name = this.props.name;
    e.target.value = option;
    this.props.onChange(e);
  };

  deselect = () => (e) => {
    e.target.name = this.props.name;
    e.target.value = null;
    this.props.onChange(e);
  };

  isOptionSelected = (option) => {
    return this.props.value === option;
  };

  render() {
    const { optionDisplay = (option) => option, disabled } = this.props;
    return (
      <InputContainer
        label={this.props.label}
        error={this.props.error}
        className={this.props.containerClassName}
      >
        <div className={`${this.props.className}`}>
          {this.props.options.map((option, i) => {
            const isSelected = this.isOptionSelected(option);
            const onClick = isSelected ? this.deselect() : this.select(option);

            return (
              <div
                key={i}
                className={`option-radio
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

export default Radio;
