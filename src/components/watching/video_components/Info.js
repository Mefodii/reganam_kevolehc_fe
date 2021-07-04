import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class Info extends Component {
  static propTypes = {
    statusTypes: PropTypes.array.isRequired,
    status: PropTypes.string.isRequired,
    updateStatus: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div>
        <div>Component placeholder for CHECKDATE!!</div>
        <div>
          {this.props.statusTypes.map((status, i) => (
            <span key={i}>{status}</span>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  statusTypes: state.videos.info.statusTypes,
});

export default connect(mapStateToProps, null)(Info);
