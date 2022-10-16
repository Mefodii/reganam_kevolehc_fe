import { connect } from "react-redux";
import React, { Component } from "react";
import PropTypes from "prop-types";

import Modal from "./Modal";
import VideoForm from "../forms/VideoForm";

import { closeModal } from "../../actions/modal";

export class VideoModal extends Component {
  static propTypes = {
    closeModal: PropTypes.func.isRequired,
  };

  render() {
    return (
      <Modal>
        <VideoForm
          {...this.props}
          onSuccess={this.props.closeModal}
        ></VideoForm>
      </Modal>
    );
  }
}

export default connect(null, { closeModal })(VideoModal);
