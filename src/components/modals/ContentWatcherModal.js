import { connect } from "react-redux";
import React, { Component } from "react";
import PropTypes from "prop-types";

import { closeModal } from "../../actions/modal";
import Modal from "./Modal";

export class ContentWatcherModal extends Component {
  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
  };

  closeModal = () => {
    this.props.closeModal();
  };

  render() {
    return (
      <Modal>
        <div>Content watcher modal</div>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.modal.data,
});

export default connect(mapStateToProps, { closeModal })(ContentWatcherModal);
