import React, { Component } from "react";

export class SVGArrow extends Component {
  render() {
    return (
      <svg
        className={this.props.className}
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
      </svg>
    );
  }
}

export default SVGArrow;
