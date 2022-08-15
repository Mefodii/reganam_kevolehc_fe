import React, { Component } from "react";
import PropTypes from "prop-types";

import InputContainer from "./InputContainer";
import SVGCheckCircle from "../svg/SVGCheckCircle";
import SVGXCircle from "../svg/SVGXCircle";

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
    simple: PropTypes.bool,
  };

  select = (option) => (e) => {
    e.target.name = this.props.name;
    e.target.value = [...this.props.value, option];
    this.onChange(e);
  };

  deselect = (option) => (e) => {
    e.target.name = this.props.name;
    e.target.value = this.props.value.filter((item) => item !== option);
    this.onChange(e);
  };

  isOptionSelected = (option) => {
    return this.props.value.find((item) => item === option);
  };

  onChange = (e) => {
    const form = {
      name: e.target.name,
      value: e.target.value,
    };

    this.props.onChange(e, form);
  };

  selectAll = (e) => {
    e.target.name = this.props.name;
    e.target.value = [...this.props.options];
    this.onChange(e);
  };

  deselectAll = (e) => {
    e.target.name = this.props.name;
    e.target.value = [];
    this.onChange(e);
  };

  renderButtons = () => {
    return (
      <div
        className={`flex flex-col justify-center absolute right-2 h-full top-0 space-y-1`}
      >
        <div onClick={this.selectAll}>
          <SVGCheckCircle className="w-5 simple-clickable">
            Select All
          </SVGCheckCircle>
        </div>
        <div onClick={this.deselectAll}>
          <SVGXCircle className="w-5 simple-clickable">Deselect All</SVGXCircle>
        </div>
      </div>
    );
  };

  renderInput() {
    const { optionDisplay = (option) => option, disabled } = this.props;

    return (
      <div
        className={`input-multi-options ${this.props.className}`}
        ref={this.props.innerRef}
      >
        {this.renderButtons()}
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
                ${this.props.optionClassName}
                `}
              onClick={disabled ? null : onClick}
            >
              {optionDisplay(option)}
            </div>
          );
        })}
      </div>
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

export default React.forwardRef((props, ref) => (
  <MultiSelect innerRef={ref} {...props} />
));
