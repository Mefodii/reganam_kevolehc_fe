import React, { Component } from "react";

import { OPTION_SELECTED } from "../../../util/constants";

export class Radio extends Component {
  onClick = (value) => (e) => {
    e.target.name = this.props.name;
    e.target.value = value;
    this.props.onClick(e);
  };

  render() {
    const { value: currentValue, options } = this.props;
    return (
      <div className="input-radio">
        {options.map(({ key, value }) => (
          <div
            className={`option click-transition ${
              currentValue === key && OPTION_SELECTED
            }`}
            key={key}
            value={key}
            onClick={this.onClick(key)}
          >
            {value}
          </div>
        ))}
      </div>
    );
  }
}

export default Radio;
