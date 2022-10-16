import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { setDrag, removeDrag } from "../../../actions/dragAndDrop";

import { DRAG_DEFAULT_ITEM } from "./dragConsts";

export const publicPropTypes = {
  draggable: PropTypes.bool.isRequired,
  onDragStart: PropTypes.func,
  onDragEnd: PropTypes.func,
  item: PropTypes.object,
  type: PropTypes.string,
};

export const publicDefaultProps = {
  item: undefined,
  type: DRAG_DEFAULT_ITEM,
  onDragStart: () => {},
  onDragEnd: () => {},
};

export class Drag extends Component {
  static propTypes = {
    ...publicPropTypes,
    setDrag: PropTypes.func.isRequired,
    removeDrag: PropTypes.func.isRequired,
    dndData: PropTypes.object.isRequired,
  };

  static defaultProps = {
    ...publicDefaultProps,
  };

  onDragStart = (e) => {
    const { item, type } = this.props;
    const copy = e.ctrlKey;
    this.props.setDrag(this.props.item, this.props.type, e.ctrlKey);
    this.props.onDragStart(e, { item, type, copy });
  };

  onDragEnd = (e) => {
    this.props.removeDrag();
    this.props.onDragEnd(e);
  };

  render() {
    return (
      <div
        draggable={this.props.draggable}
        onDragStart={this.onDragStart}
        onDragEnd={this.onDragEnd}
      >
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  dndData: state.dndData,
});

const mapDispatchToProps = { setDrag, removeDrag };

export default connect(mapStateToProps, mapDispatchToProps)(Drag);
