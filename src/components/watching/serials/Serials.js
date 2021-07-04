import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getSerials, deleteSerial } from "../../../actions/videos";

export class Serials extends Component {
  static propTypes = {
    serials: PropTypes.array.isRequired,
    getSerials: PropTypes.func.isRequired,
    deleteSerial: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getSerials();
  }

  onChangeStatus = (video, new_status) => {
    console.log(video, new_status);
  };

  render() {
    return (
      <Fragment>
        <div className="text-gray-100 w-full flex flex-col items-center">
          <h2 className="text-xl uppercase font-bold m-4">
            Welcome to Serials, fellow watcher
          </h2>
          <table className="table bg-gray-800 rounded-xl shadow-lg w-10/12">
            <thead>
              <tr>
                <th>Name</th>
                <th>Aliases</th>
                <th>Status</th>
                <th>Seasons</th>
                <th>Check Date</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {this.props.serials.map((video) => (
                <tr key={video.id}>
                  <td>{video.name}</td>
                  <td>{video.alias}</td>
                  <td>
                    <div className="dropdown">
                      <button
                        className="btn dropdown-toggle"
                        type="button"
                        id="dropDownStatus"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        {video.status}
                      </button>
                      <div
                        className="dropdown-menu flex"
                        aria-labelledby="dropDownStatus"
                      >
                        {this.props.statusTypes.map((status) => (
                          <div
                            className="dropdown-item"
                            onClick={this.onChangeStatus.bind(this, video, {
                              status,
                            })}
                            key={status}
                          >
                            {status}
                          </div>
                        ))}
                      </div>
                    </div>
                  </td>
                  <td />
                  <td>{video.check_date}</td>
                  <td>
                    <button className="btn btn-success btn-sm">Update</button>
                    <br />
                    <button
                      onClick={this.props.deleteSerial.bind(
                        this,
                        video.id,
                        video.type
                      )}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  serials: state.videos.serials,
  statusTypes: state.videos.info.statusTypes,
});

export default connect(mapStateToProps, { getSerials, deleteSerial })(Serials);
