import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getGroups } from "../../../actions/groups";

import GroupList from "../watchio_components/GroupList";
import { MOVIES_BACKGROUND } from "../../../util/frontend-urls";

export class Movies extends Component {
  static propTypes = {
    groups: PropTypes.array.isRequired,
    getGroups: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getGroups(this.props.watchioMovie);
  }

  render() {
    const { watchioMovie, groups } = this.props;
    return (
      <GroupList
        watchioType={watchioMovie}
        groups={groups}
        backgroundPicture={MOVIES_BACKGROUND}
      ></GroupList>
    );
  }
}

const mapStateToProps = (state) => ({
  groups: state.movies.groups,
  watchioMovie: state.info.watchioTypes.movie,
});

export default connect(mapStateToProps, {
  getGroups,
})(Movies);
