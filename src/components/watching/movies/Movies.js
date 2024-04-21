import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getGroups } from '../../../actions/groups';

import GroupList from '../watching_components/GroupList';
import { MOVIES_BACKGROUND } from '../../../util/frontend-urls';
import { selectMovieType } from '../../../features/watching/info/infoSlice';

export class Movies extends Component {
  static propTypes = {
    groups: PropTypes.array.isRequired,
    getGroups: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getGroups(this.props.movieType);
  }

  render() {
    const { movieType, groups } = this.props;
    return (
      <GroupList
        watchingType={movieType}
        groups={groups}
        backgroundPicture={MOVIES_BACKGROUND}
      ></GroupList>
    );
  }
}

const mapStateToProps = (state) => ({
  groups: state.movies.groups,
  movieType: selectMovieType(state),
});

export default connect(mapStateToProps, {
  getGroups,
})(Movies);
