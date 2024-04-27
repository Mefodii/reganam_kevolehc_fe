import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Modal from '../../modals/Modal';
import VideoForm from './VideoForm';

import { closeModal } from '../../../redux/modalSlice';

class VideoModal extends Component {
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
