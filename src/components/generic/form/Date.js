import React, { Component } from "react";
import SVGCalendar from "../svg/SVGCalendar";

import { getToday } from "../../../util/functions";

export class Date extends Component {
  setToday = (e) => {
    e.target.name = this.props.name;
    e.target.value = getToday();
    this.props.onChange(e);
  };

  autoSize = (e) => {
    e.target.style.height = `inherit`;
    e.target.style.height = `${e.target.scrollHeight}px`;
    this.props.onChange(e);
  };

  render() {
    return (
      <div>
        <textarea
          className={`input-text overflow-hidden resize-none`}
          type="textarea"
          name={this.props.name}
          onChange={this.autoSize}
          onKeyDown={this.props.onKeyDown}
          value={this.props.value}
          disabled={this.props.disabled}
          rows="1"
          maxLength={this.props.maxLength}
        />
        <div
          className={`absolute right-2 top-1 ${
            this.props.disabled ? "hidden" : ""
          }`}
          onClick={this.setToday}
        >
          <SVGCalendar className="w-6 simple-clickable"></SVGCalendar>
        </div>
      </div>
    );
  }
}

export default Date;
