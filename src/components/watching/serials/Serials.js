import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getGroups } from "../../../actions/groups";

import GroupList from "../watchio_components/GroupList";
import { SERIALS_BACKGROUND } from "../../../util/urls";

export class Serials extends Component {
  static propTypes = {
    groups: PropTypes.array.isRequired,
    getGroups: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getGroups(this.props.watchioSerial);
  }

  render() {
    const { watchioSerial, groups } = this.props;
    return (
      <GroupList
        watchioType={watchioSerial}
        groups={groups}
        backgroundPicture={SERIALS_BACKGROUND}
      ></GroupList>
    );
  }
}

const mapStateToProps = (state) => ({
  groups: state.serials.groups,
  watchioSerial: state.info.watchioTypes.serial,
});

export default connect(mapStateToProps, {
  getGroups,
})(Serials);
