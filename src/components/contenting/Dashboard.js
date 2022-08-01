import { connect } from "react-redux";
import React, { Component } from "react";
import PropTypes from "prop-types";

import { openCreateContentWatcherModal } from "../../actions/modal";

class Dashboard extends Component {
  static propTypes = {
    openCreateContentWatcherModal: PropTypes.func.isRequired,
  };

  render() {
    return (
      <h1 onClick={this.props.openCreateContentWatcherModal}>
        Placehold for content list page
      </h1>
    );
  }
}

export default connect(null, { openCreateContentWatcherModal })(Dashboard);
