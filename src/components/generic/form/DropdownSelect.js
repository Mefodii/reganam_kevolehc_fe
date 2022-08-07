import { Component } from "react";
import PropTypes from "prop-types";

import InputContainer from "./InputContainer";

export class DropdownSelect extends Component {
  static propTypes = {
    error: PropTypes.string,
    label: PropTypes.string,
    containerClassName: PropTypes.string,
    //
    className: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.any,
    placeholder: PropTypes.string,
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

  isSelected = () => {
    const { value, options } = this.props;
    return options.find((item) => item === value);
  };

  render() {
    const {
      optionDisplay = (option) => option,
      disabled,
      value,
      placeholder,
    } = this.props;
    const shownValue = value ? optionDisplay(value) : placeholder;

    return (
      <InputContainer
        label={this.props.label}
        error={this.props.error}
        className={this.props.containerClassName}
      >
        <div className={`relative group`}>
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
                  option === value ? this.deselect() : this.select(option);
                return (
                  <div
                    className="option-dropdown-item"
                    key={i}
                    onClick={disabled ? null : onClick}
                  >
                    {optionDisplay(option)}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </InputContainer>
    );
  }
}

export default DropdownSelect;
