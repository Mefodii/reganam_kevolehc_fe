import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class Serials extends Component {
  static propTypes = {
    serials: PropTypes.array.isRequired,
    getSerials: PropTypes.func.isRequired,
    deleteSerial: PropTypes.func.isRequired,
  };

  render() {
    return (
      <Fragment>
        <div className="text-gray-100 w-full flex flex-col items-center">
          <div className="text-xl uppercase font-bold m-4">
            Welcome to Serials, fellow watcher
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  serials: state.serials.serials,
  statusTypes: state.info.statusTypes,
});

export default connect(mapStateToProps, {})(Serials);
