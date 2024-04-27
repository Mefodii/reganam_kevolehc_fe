import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import GroupList from '../watching_components/GroupList';
import { MOVIES_BACKGROUND } from '../../../util/frontend-urls';
import { selectMovieType } from '../../../features/watching/info/infoSlice';
import {
  fetchGroups,
  selectGroupsByWatchingType,
} from '../../../features/watching/groups/groupsSlice';

export class Movies extends Component {
  static propTypes = {
    watchingType: PropTypes.string.isRequired,
    groups: PropTypes.array.isRequired,
    fetchGroups: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.fetchGroups(this.props.watchingType);
  }

  render() {
    const { watchingType, groups } = this.props;
    return (
      <GroupList
        watchingType={watchingType}
        groups={groups}
        backgroundPicture={MOVIES_BACKGROUND}
      ></GroupList>
    );
  }
}

const mapStateToProps = (state) => {
  const watchingType = selectMovieType(state);
  return {
    groups: selectGroupsByWatchingType(state, watchingType),
    watchingType,
  };
};

export default connect(mapStateToProps, {
  fetchGroups,
})(Movies);
