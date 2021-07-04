import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getMovies, deleteMovie } from "../../../actions/movies";

export class Movies extends Component {
  static propTypes = {
    movies: PropTypes.array.isRequired,
    getMovies: PropTypes.func.isRequired,
    deleteMovie: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getMovies();
  }

  render() {
    return (
      <Fragment>
        <div className="text-gray-100 w-full flex flex-col items-center">
          <h2 className="text-xl uppercase font-bold m-4">
            Welcome to Movies, fellow watcher
          </h2>
          <table className="table bg-gray-800 rounded-xl shadow-lg w-10/12">
            <thead>
              <tr>
                <th>Name</th>
                <th>Aliases</th>
                <th>Year</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {this.props.movies.map((video) => (
                <tr key={video.id}>
                  <td>{video.name}</td>
                  <td>{video.alias}</td>
                  <td>{video.year}</td>
                  <td>{video.status}</td>
                  <td>
                    <button
                      onClick={this.props.deleteMovie.bind(
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
  movies: state.movies.movies,
});

export default connect(mapStateToProps, { getMovies, deleteMovie })(Movies);
