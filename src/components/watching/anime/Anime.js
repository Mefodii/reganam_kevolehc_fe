import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getGroups } from '../../../actions/groups';

import GroupList from '../watching_components/GroupList';
import { ANIME_BACKGROUND } from '../../../util/frontend-urls';
import { selectAnimeType } from '../../../features/watching/info/infoSlice';

export class Anime extends Component {
  static propTypes = {
    groups: PropTypes.array.isRequired,
    getGroups: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getGroups(this.props.animeType);
  }

  render() {
    const { animeType, groups } = this.props;
    return (
      <GroupList
        watchingType={animeType}
        groups={groups}
        backgroundPicture={ANIME_BACKGROUND}
      ></GroupList>
    );
  }
}

const mapStateToProps = (state) => ({
  groups: state.anime.groups,
  animeType: selectAnimeType(state),
});

export default connect(mapStateToProps, {
  getGroups,
})(Anime);
