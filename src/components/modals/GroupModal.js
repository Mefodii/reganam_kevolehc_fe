import { connect } from "react-redux";
import React, { Component } from "react";
import PropTypes from "prop-types";

import Modal from "./Modal";
import GroupForm from "../forms/GroupForm";

import { closeModal } from "../../actions/modal";

export class GroupModal extends Component {
  static propTypes = {
    closeModal: PropTypes.func.isRequired,
  };

  render() {
    return (
      <Modal>
        <GroupForm
          {...this.props}
          onSuccess={this.props.closeModal}
        ></GroupForm>
      </Modal>
    );
  }
}

export default connect(null, { closeModal })(GroupModal);
