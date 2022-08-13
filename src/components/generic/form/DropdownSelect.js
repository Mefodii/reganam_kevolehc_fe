import React, { Component } from "react";
import PropTypes from "prop-types";

import InputContainer from "./InputContainer";

export class DropdownSelect extends Component {
  static propTypes = {
    error: PropTypes.string,
    label: PropTypes.string,
    containerClassName: PropTypes.string,
    //
    className: PropTypes.string,
    optionClassName: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.any,
    placeholder: PropTypes.string,
    options: PropTypes.array.isRequired,
    optionDisplay: PropTypes.func,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    deselect: PropTypes.bool,
    simple: PropTypes.bool,
  };

  select = (option) => (e) => {
    e.target.name = this.props.name;
    e.target.value = option;
    this.onChange(e);
  };

  deselect = () => (e) => {
    e.target.name = this.props.name;
    e.target.value = null;
    this.onChange(e);
  };

  isSelected = () => {
    const { value, options } = this.props;
    return options.find((item) => item === value);
  };

  onChange = (e) => {
    const form = {
      name: e.target.name,
      value: e.target.value,
    };

    this.props.onChange(e, form);
  };

  renderInput = () => {
    const {
      optionDisplay = (option) => option,
      disabled,
      deselect,
      value,
      placeholder,
    } = this.props;
    const shownValue = value ? optionDisplay(value) : placeholder;

    return (
      <div className={`relative group`} ref={this.props.innerRef}>
        <div
          className={`option-single 
          ${this.isSelected() && "option-selected"}
          ${this.props.disabled && "option-disabled"}
          ${this.props.className}
          `}
        >
          {shownValue}
        </div>
        {!disabled && (
          <div className="option-dropdown-container">
            {this.props.options.map((option, i) => {
              const onClick =
                option === value
                  ? deselect
                    ? this.deselect()
                    : null
                  : this.select(option);

              return (
                <div
                  className={`option-dropdown-item
                  ${this.props.optionClassName}
                  `}
                  key={i}
                  onClick={onClick}
                >
                  {optionDisplay(option)}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

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
  <DropdownSelect innerRef={ref} {...props} />
));
