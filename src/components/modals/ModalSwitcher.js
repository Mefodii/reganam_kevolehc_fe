import { connect } from "react-redux";
import React, { Component } from "react";
import PropTypes from "prop-types";

import { CREATE_CONTENT_WATCHER_MODAL, GROUP_MODAL } from "../../actions/modal";
import ContentWatcherModal from "./ContentWatcherModal";
import Modal from "./Modal";
import GroupModal from "./GroupModal";

export class ModalSwitcher extends Component {
  static propTypes = {
    modalType: PropTypes.string.isRequired,
  };

  render() {
    switch (this.props.modalType) {
      case CREATE_CONTENT_WATCHER_MODAL:
        return <ContentWatcherModal />;
      case GROUP_MODAL:
        return <GroupModal />;
      default:
        return (
          <Modal>
            <div>Undefined modal type: {this.props.modalType}</div>
          </Modal>
        );
    }
  }
}

const mapStateToProps = (state) => ({
  modalType: state.modal.modalType,
});

export default connect(mapStateToProps, null)(ModalSwitcher);
