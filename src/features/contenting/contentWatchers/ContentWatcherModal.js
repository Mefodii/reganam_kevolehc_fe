import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Modal from '../../modals/Modal';
import ContentWatcherForm from './ContentWatcherForm';

import { closeModal, selectData } from '../../../redux/modalSlice';

class ContentWatcherModal extends Component {
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
        <ContentWatcherForm
          {...this.props}
          onSuccess={this.props.closeModal}
        ></ContentWatcherForm>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  data: selectData(state),
});

export default connect(mapStateToProps, { closeModal })(ContentWatcherModal);
