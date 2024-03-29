import React, { Component } from "react";

export class SVGPlus extends Component {
  render() {
    return (
      <svg
        className={this.props.className}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 4v16m8-8H4"
        />
      </svg>
    );
  }
}

export default SVGPlus;
