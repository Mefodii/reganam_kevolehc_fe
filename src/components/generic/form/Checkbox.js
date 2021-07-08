import React, { Component } from "react";

import { OPTION_SELECTED } from "../../../util/cssUtils";

export class Checkbox extends Component {
  onClick = (e) => {
    e.target.name = this.props.name;
    e.target.value = !this.props.checked;
    this.props.onClick(e);
  };

  render() {
    const { checked, text, title } = this.props;
    return (
      <div
        className={`option click-transition ${checked && OPTION_SELECTED}`}
        title={title}
        onClick={this.onClick}
      >
        {text}
      </div>
    );
  }
}

export default Checkbox;
