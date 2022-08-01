import { connect } from "react-redux";
import React, { Component } from "react";
import PropTypes from "prop-types";

import { closeModal, CREATE_CONTENT_WATCHER_MODAL } from "../../actions/modal";
import ContentWatcherModal from "../contenting/ContentWatcherModal";

export class Modal extends Component {
  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    modalType: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
  };

  closeModal = () => {
    this.props.closeModal();
  };

  renderModalContent = () => {
    switch (this.props.modalType) {
      case CREATE_CONTENT_WATCHER_MODAL:
        return <ContentWatcherModal />;
      default:
        return <div>Undefined modal type: {this.props.modalType}</div>;
    }
  };

  render() {
    if (!this.props.isOpen) return null;

    return (
      <div className="modal">
        <div className="modal-bg" onClick={this.closeModal}></div>
        <div
          className={`${this.props.data?.cardClassName || "w-1/2"} modal-card`}
        >
          <div className="modal-close-button" onClick={this.closeModal}>
            X
          </div>
          {this.renderModalContent()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isOpen: state.modal.isOpen,
  data: state.modal.data,
  modalType: state.modal.modalType,
});

export default connect(mapStateToProps, { closeModal })(Modal);
