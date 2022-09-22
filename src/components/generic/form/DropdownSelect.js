import React, { Component } from "react";
import PropTypes from "prop-types";

import InputContainer from "./InputContainer";
import Options from "./Options";

export class DropdownSelect extends Component {
  static propTypes = {
    error: PropTypes.string,
    label: PropTypes.string,
    containerClassName: PropTypes.string,
    //
    className: PropTypes.string,
    optionClassName: PropTypes.string,
    optionContainerClassName: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.any,
    placeholder: PropTypes.string,
    options: PropTypes.array.isRequired,
    optionDisplay: PropTypes.func,
    onChange: PropTypes.func.isRequired,
    hideOnChange: PropTypes.bool,
    disabled: PropTypes.bool,
    deselect: PropTypes.bool,
    simple: PropTypes.bool,
  };

  static defaultProps = {
    className: "",
    optionClassName: "",
    optionContainerClassName: "",
    containerClassName: "",
    hideOnChange: true,
    optionDisplay: (option) => option,
  };

  state = {
    showOptions: false,
  };

  isSelected = () => {
    const { value, options } = this.props;
    return options.find((item) => item === value);
  };

  onOptionClick = (e, option) => {
    if (option !== this.props.value) {
      e.target.name = this.props.name;
      e.target.value = option;
      this.onChange(e);
    }

    if (option === this.props.value && this.props.deselect) {
      e.target.name = this.props.name;
      e.target.value = null;
      this.onChange(e);
    }
  };

  onChange = (e) => {
    const form = {
      name: e.target.name,
      value: e.target.value,
    };

    this.props.onChange(e, form);
    if (this.props.hideOnChange) this.showOptions(false);
  };

  showOptions = (showOptions) => {
    this.setState({ showOptions });
  };

  renderInput = () => {
    const { optionDisplay, disabled, value, placeholder } = this.props;
    const { showOptions } = this.state;

    const optionsHidden = disabled || !showOptions;
    const shownValue = value ? optionDisplay(value) : placeholder;

    return (
      <div
        className="relative"
        ref={this.props.innerRef}
        onMouseEnter={() => this.showOptions(true)}
        onMouseLeave={() => this.showOptions(false)}
      >
        <div
          className={`option-single 
          ${this.isSelected() && "option-selected"}
          ${disabled && "option-disabled"}
          ${this.props.className}
          `}
        >
          {shownValue}
        </div>
        <Options
          className={this.props.optionContainerClassName}
          optionClassName={this.props.optionClassName}
          options={this.props.options}
          optionDisplay={optionDisplay}
          onClick={this.onOptionClick}
          show={!optionsHidden}
        />
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
