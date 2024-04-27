import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { ANIME_BACKGROUND } from '../../../util/frontend-urls';

import GroupList from '../groups/GroupList';

import { selectAnimeType } from '../info/infoSlice';
import { fetchGroups, selectGroupsByWatchingType } from '../groups/groupsSlice';

class Anime extends Component {
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
        backgroundPicture={ANIME_BACKGROUND}
      ></GroupList>
    );
  }
}

const mapStateToProps = (state) => {
  const watchingType = selectAnimeType(state);
  return {
    groups: selectGroupsByWatchingType(state, watchingType),
    watchingType,
  };
};

export default connect(mapStateToProps, {
  fetchGroups,
})(Anime);
