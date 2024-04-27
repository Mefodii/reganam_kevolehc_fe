import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { DRAG_DEFAULT_ITEM } from '../../util/constants';

import { removeDrag, setDrag } from '../../redux/dragAndDropSlice';

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

class Drag extends Component {
  static propTypes = {
    ...publicPropTypes,
    setDrag: PropTypes.func.isRequired,
    removeDrag: PropTypes.func.isRequired,
  };

  static defaultProps = {
    ...publicDefaultProps,
  };

  onDragStart = (e) => {
    const { item, type } = this.props;
    const dndData = { item, type, copy: e.ctrlKey };
    this.props.setDrag(dndData);
    this.props.onDragStart(e, dndData);
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

const mapStateToProps = (state) => ({});

const mapDispatchToProps = { setDrag, removeDrag };

export default connect(mapStateToProps, mapDispatchToProps)(Drag);
