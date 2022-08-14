import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";

export class CompactButton extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string,
  };

  static defaultProps = {
    className: "",
  };

  render() {
    return (
      <div
        className={`p-2 cursor-pointer flex items-center space-x-2 hover:text-active-1 hover:bg-theme-3
        ${this.props.className}
        `}
        onClick={this.props.onClick}
      >
        {this.props.children}
        <div
          className={`w-0 scale-0 group-hover:scale-100 group-hover:w-full transition-all duration-300 
          overflow-hidden whitespace-nowrap text-left
          `}
        >
          {this.props.text}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CompactButton);
