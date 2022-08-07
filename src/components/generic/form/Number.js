import React, { Component } from "react";
import PropTypes from "prop-types";

import SVGArrow from "../svg/SVGArrow";
import InputContainer from "./InputContainer";

export class Number extends Component {
  static propTypes = {
    error: PropTypes.string,
    label: PropTypes.string,
    containerClassName: PropTypes.string,
    //
    className: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.number,
    minmax: PropTypes.array,
    onChange: PropTypes.func.isRequired,
    onKeyDown: PropTypes.func,
    disabled: PropTypes.bool,
    hideArrows: PropTypes.bool,
  };

  state = {
    focus: false,
  };

  onIncrement = (e) => {
    e.target.name = this.props.name;
    e.target.value = parseInt(this.props.value) + 1;
    this.onChange(e);
  };

  onDecrement = (e) => {
    e.target.name = this.props.name;
    e.target.value = parseInt(this.props.value) - 1;
    this.onChange(e);
  };

  onChange = (e) => {
    if (this.isValid(e.target.value)) this.props.onChange(e);
  };

  isValid = (value) => {
    const [min, max] = this.props.minmax || [undefined, undefined];
    if (!isNaN(min) && value < min) {
      return false;
    }

    if (!isNaN(max) && value > max) {
      return false;
    }

    return true;
  };

  onFocus = () => this.setState({ focus: true });
  onBlur = () => this.setState({ focus: false });

  renderArrows = () => {
    return (
      <div
        className={`flex flex-col justify-center absolute right-2 h-full top-0 space-y-1 ${
          this.state.focus ? "scale-100" : "scale-0"
        } group-hover:scale-100 ease-in duration-100`}
      >
        <div onClick={this.onIncrement}>
          <SVGArrow className="w-3 -rotate-90 simple-clickable"></SVGArrow>
        </div>
        <div onClick={this.onDecrement}>
          <SVGArrow className="w-3 rotate-90 simple-clickable"></SVGArrow>
        </div>
      </div>
    );
  };

  render() {
    // TODO: Check the error with null (when switching group type single)
    return (
      <InputContainer
        label={this.props.label}
        error={this.props.error}
        className={this.props.containerClassName}
      >
        <div className="group" onFocus={this.onFocus} onBlur={this.onBlur}>
          <input
            className={`input-text text-center input-border-placeholder ${this.props.className}`}
            type="number"
            name={this.props.name}
            onChange={this.props.onChange}
            onKeyDown={this.props.onKeyDown}
            value={this.props.value}
            disabled={this.props.disabled}
          />
          {!this.props.hideArrows &&
            !this.props.disabled &&
            this.renderArrows()}
        </div>
      </InputContainer>
    );
  }
}

export default Number;
