import { connect } from "react-redux";
import React, { Component } from "react";
import PropTypes from "prop-types";

import { closeModal } from "../../actions/modal";

export class ContentWatcherModal extends Component {
  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
  };

  closeModal = () => {
    this.props.closeModal();
  };

  render() {
    return <div>Content watcher modal</div>;
  }
}

const mapStateToProps = (state) => ({
  data: state.modal.data,
});

export default connect(mapStateToProps, { closeModal })(ContentWatcherModal);
