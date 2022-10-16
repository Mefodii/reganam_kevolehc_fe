import React, { Component } from "react";
import { filterComponentProps } from "../../../util/functions";
import Drag, { publicPropTypes as dragPT } from "./Drag";
import Drop, { publicPropTypes as dropPT } from "./Drop";

export class DragAndDrop extends Component {
  static propTypes = {
    ...dragPT,
    ...dropPT,
  };

  render() {
    const dragProps = filterComponentProps(dragPT, this.props);
    const dropProps = filterComponentProps(dropPT, this.props);

    return (
      <Drag {...dragProps}>
        <Drop {...dropProps}>{this.props.children}</Drop>
      </Drag>
    );
  }
}

export default DragAndDrop;
