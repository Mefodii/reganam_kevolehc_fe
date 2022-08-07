import React, { Component } from "react";
import PropTypes from "prop-types";

import SVGCalendar from "../svg/SVGCalendar";
import InputContainer from "./InputContainer";

import { getToday } from "../../../util/functions";

export class Date extends Component {
  static propTypes = {
    error: PropTypes.string,
    label: PropTypes.string,
    containerClassName: PropTypes.string,
    //
    className: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    maxLength: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    onKeyDown: PropTypes.func,
    disabled: PropTypes.bool,
  };

  setToday = (e) => {
    e.target.name = this.props.name;
    e.target.value = getToday();
    this.props.onChange(e);
  };

  render() {
    return (
      <InputContainer
        label={this.props.label}
        error={this.props.error}
        className={this.props.containerClassName}
      >
        <input
          className={`input-text input-border-placeholder ${this.props.className}`}
          type="text"
          name={this.props.name}
          value={this.props.value}
          maxLength={this.props.maxLength}
          onChange={this.props.onChange}
          onKeyDown={this.props.onKeyDown}
          disabled={this.props.disabled}
        />
        <div
          className={`absolute right-2 top-1 ${
            this.props.disabled ? "hidden" : ""
          }`}
          onClick={this.setToday}
        >
          <SVGCalendar className="w-6 simple-clickable"></SVGCalendar>
        </div>
      </InputContainer>
    );
  }
}

export default Date;
