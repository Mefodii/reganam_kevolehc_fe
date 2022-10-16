import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";

export const publicPropTypes = {
  droppable: PropTypes.bool,
  onDragOver: PropTypes.func,
  onDragEnter: PropTypes.func,
  onDragLeave: PropTypes.func,
  onDrop: PropTypes.func,
};

export const publicDefaultProps = {
  droppable: true,
  onDragOver: () => {},
  onDragEnter: () => {},
  onDragLeave: () => {},
  onDrop: () => {},
};

export class Drop extends Component {
  static propTypes = {
    ...publicPropTypes,
    dndData: PropTypes.object.isRequired,
  };

  static defaultProps = {
    ...publicDefaultProps,
  };

  state = {
    dragOver: false,
    dragCounter: 0,
  };

  onDragOver = (e) => {
    e.preventDefault();
    this.props.onDragOver(e, this.props.dndData);
  };

  onDragEnter = (e) => {
    const prevOver = this.state.dragOver;
    this.setState(
      (prevState) => {
        const dragCounter = prevState.dragCounter + 1;
        const dragOver = dragCounter > 0;
        return { dragOver, dragCounter };
      },
      () => {
        if (this.state.dragOver && !prevOver)
          this.props.onDragEnter(e, this.props.dndData);
      }
    );
  };

  onDragLeave = (e) => {
    const prevOver = this.state.dragOver;
    this.setState(
      (prevState) => {
        const dragCounter = prevState.dragCounter - 1;
        const dragOver = dragCounter > 0;
        return { dragOver, dragCounter };
      },
      () => {
        if (!this.state.dragOver && prevOver)
          this.props.onDragLeave(e, this.props.dndData);
      }
    );
  };

  onDrop = (e) => {
    e.preventDefault();
    this.setState({ dragOver: false, dragCounter: 0 }, () => {
      this.props.onDrop(e, this.props.dndData);
    });
  };

  render() {
    return (
      <div
        onDragOver={this.onDragOver}
        onDragEnter={this.onDragEnter}
        onDragLeave={this.onDragLeave}
        onDrop={this.onDrop}
      >
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  dndData: state.dndData,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Drop);
