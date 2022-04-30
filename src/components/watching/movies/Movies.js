import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getGroups } from "../../../actions/groups";
import { updateTheme } from "../../../actions/page";

import GroupList from "../watchio_components/GroupList";

export class Movies extends Component {
  static propTypes = {
    groups: PropTypes.array.isRequired,
    getGroups: PropTypes.func.isRequired,
    updateTheme: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getGroups(this.props.watchioMovie);
    this.props.updateTheme();
  }

  render() {
    const { watchioMovie, groups } = this.props;
    return <GroupList watchioType={watchioMovie} groups={groups}></GroupList>;
  }
}

const mapStateToProps = (state) => ({
  groups: state.movies.groups,
  watchioMovie: state.info.watchioTypes.movie,
});

export default connect(mapStateToProps, {
  getGroups,
  updateTheme,
})(Movies);
