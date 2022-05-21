import React, { Component } from "react";

import SVGArrow from "../svg/SVGArrow";

export class Number extends Component {
  state = {
    focus: false,
  };

  onIncrement = (e) => {
    e.target.name = this.props.name;
    e.target.value = parseInt(this.props.value) + 1;
    this.props.onChange(e);
  };

  onDecrement = (e) => {
    e.target.name = this.props.name;
    e.target.value = parseInt(this.props.value) - 1;
    this.props.onChange(e);
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
    return (
      <div className="group" onFocus={this.onFocus} onBlur={this.onBlur}>
        <input
          className="input-text text-center"
          type="number"
          name={this.props.name}
          onChange={this.props.onChange}
          onKeyDown={this.props.onKeyDown}
          value={this.props.value}
          disabled={this.props.disabled}
        />
        {!this.props.hideArrows && this.renderArrows()}
      </div>
    );
  }
}

export default Number;
