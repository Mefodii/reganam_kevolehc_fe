import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class Movies extends Component {
  static propTypes = {
    movies: PropTypes.array.isRequired,
    getMovies: PropTypes.func.isRequired,
    deleteMovie: PropTypes.func.isRequired,
  };

  render() {
    return (
      <Fragment>
        <div className="text-gray-100 w-full flex flex-col items-center">
          <div className="text-xl uppercase font-bold m-4">
            Welcome to Movies, fellow watcher
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  movies: state.movies.movies,
});

export default connect(mapStateToProps, {})(Movies);
