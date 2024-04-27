import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Modal from '../../modals/Modal';
import GroupForm from './GroupForm';

import { closeModal, openVideoModal } from '../../../redux/modalSlice';

class GroupModal extends Component {
  static propTypes = {
    closeModal: PropTypes.func.isRequired,
  };

  onGroupSuccess = (groupCreated, group) => {
    this.props.closeModal();
    if (groupCreated && !group.single) this.openVideoModal(group);
  };

  openVideoModal = (group) => {
    const { watchingType, edit } = this.props;
    const groupId = group.id;
    const defaultOrder = 1;
    this.props.openVideoModal({ watchingType, groupId, defaultOrder, edit });
  };

  render() {
    return (
      <Modal>
        <GroupForm {...this.props} onSuccess={this.onGroupSuccess}></GroupForm>
      </Modal>
    );
  }
}

export default connect(null, { closeModal, openVideoModal })(GroupModal);
