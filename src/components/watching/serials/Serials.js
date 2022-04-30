import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getGroups } from "../../../actions/groups";
import { updateTheme } from "../../../actions/page";

import GroupList from "../watchio_components/GroupList";

export class Serials extends Component {
  static propTypes = {
    groups: PropTypes.array.isRequired,
    getGroups: PropTypes.func.isRequired,
    updateTheme: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getGroups(this.props.watchioSerial);
    this.props.updateTheme();
  }

  render() {
    const { watchioSerial, groups } = this.props;
    return <GroupList watchioType={watchioSerial} groups={groups}></GroupList>;
  }
}

const mapStateToProps = (state) => ({
  groups: state.serials.groups,
  watchioSerial: state.info.watchioTypes.serial,
});

export default connect(mapStateToProps, {
  getGroups,
  updateTheme,
})(Serials);
