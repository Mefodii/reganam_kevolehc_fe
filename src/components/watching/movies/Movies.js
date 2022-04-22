import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getMovieGroups, addMovieGroup } from "../../../actions/movies";
import { updateTheme } from "../../../actions/page";

import GroupForm from "../video_components/GroupForm";

export class Movies extends Component {
  static propTypes = {
    groups: PropTypes.array.isRequired,
    getMovieGroups: PropTypes.func.isRequired,
    addMovieGroup: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getMovieGroups();
    this.props.updateTheme();
  }

  componentWillUnmount() {
    this.props.updateTheme();
  }

  render() {
    return (
      <div className="w-full flex flex-col items-center">
        <h2 className="text-xl uppercase font-bold m-4">
          Welcome to Movies, fellow watcher
        </h2>
        <div className="rounded-xl shadow-lg w-10/12 space-y-10">
          <div className="bg-primary border border-tertiary">
            <GroupForm
              submit={this.props.addMovieGroup}
              type={this.props.movieType}
            ></GroupForm>
          </div>
          <div className="bg-primary border border-tertiary"></div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  groups: state.movies.groups,
  movieType: state.info.videoTypes.movie,
});

export default connect(mapStateToProps, {
  getMovieGroups,
  updateTheme,
  addMovieGroup,
})(Movies);
