import React, { Component } from 'react'

class SVGDownArrow extends Component {
    render() {
        return (
            <svg
              className={`w-5 ${this.props.className}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
        )
    }
}

export default SVGDownArrow
