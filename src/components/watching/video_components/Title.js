import React, { Component } from "react";
import PropTypes from "prop-types";

export class Title extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
  };

  render() {
    const { name } = this.props;
    return (
      <div className="">
        <h5 className="">{name}</h5>
        <p>
          Alias 1<br />
          Alias 2 <br /> Alias 3
        </p>
      </div>
    );
  }
}

export default Title;
