import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getGroups } from '../../../actions/groups';

import GroupList from '../watching_components/GroupList';
import { SERIALS_BACKGROUND } from '../../../util/frontend-urls';
import { selectSerialType } from '../../../features/watching/info/infoSlice';

export class Serials extends Component {
  static propTypes = {
    groups: PropTypes.array.isRequired,
    getGroups: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getGroups(this.props.serialType);
  }

  render() {
    const { serialType, groups } = this.props;
    return (
      <GroupList
        watchingType={serialType}
        groups={groups}
        backgroundPicture={SERIALS_BACKGROUND}
      ></GroupList>
    );
  }
}

const mapStateToProps = (state) => ({
  groups: state.serials.groups,
  serialType: selectSerialType(state),
});

export default connect(mapStateToProps, {
  getGroups,
})(Serials);
