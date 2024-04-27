import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { SERIALS_BACKGROUND } from '../../../util/frontend-urls';

import GroupList from '../groups/GroupList';

import { selectSerialType } from '../info/infoSlice';
import { fetchGroups, selectGroupsByWatchingType } from '../groups/groupsSlice';

class Serials extends Component {
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
        backgroundPicture={SERIALS_BACKGROUND}
      ></GroupList>
    );
  }
}

const mapStateToProps = (state) => {
  const watchingType = selectSerialType(state);
  return {
    groups: selectGroupsByWatchingType(state, watchingType),
    watchingType,
  };
};

export default connect(mapStateToProps, {
  fetchGroups,
})(Serials);
