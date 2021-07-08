import React, { Component } from "react";
import PropTypes from "prop-types";

import { SketchPicker } from "react-color";

import { setBgColor } from "../../util/cssUtils";

export class ColorPicker extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    initialColor: PropTypes.string.isRequired,
    isEditable: PropTypes.bool.isRequired,
    //
    onChange: PropTypes.func,
  };

  state = {
    color: "",
    isHidden: true,
  };

  openPicker = () => {
    if (!this.props.isEditable) return;
    this.setState({ isHidden: false, color: this.props.initialColor });
  };

  onConfirm = (e) => {
    e.target.name = this.props.name;
    e.target.value = this.state.color;
    this.props.onChange(e);
    this.setState({ isHidden: true });
  };

  onCancel = () => this.setState({ isHidden: true });

  componentDidMount() {
    const color = this.props.initialColor;
    this.setState({ color, isHidden: true });
  }

  render() {
    const { color, isHidden } = this.state;
    const { isEditable } = this.props;

    return (
      <div className="relative">
        <div
          className={`h-full w-16 border border-gray-600 
                rounded-sm ${isEditable && "cursor-pointer"}`}
          style={setBgColor(this.props.initialColor)}
          onClick={this.openPicker}
        ></div>

        <div className={isHidden ? "hidden" : ""}>
          <div className="modal-bg z-10"></div>
          <div className="absolute bottom-10 border border-black bg-gray-100 z-10">
            <SketchPicker
              color={color}
              onChangeComplete={(color) => this.setState({ color: color.hex })}
            ></SketchPicker>
            <div className="flex justify-between bg-gray-200 dark:bg-gray-800 p-2 ">
              <div
                className="button-generic click-transition"
                onClick={this.onConfirm}
              >
                Confirm
              </div>
              <div
                className="button-generic click-transition"
                onClick={this.onCancel}
              >
                Cancel
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ColorPicker;
