import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Modal from '../../modals/Modal';
import FilterForm from './FilterForm';

import { closeModal } from '../../../redux/modalSlice';

class FiltersModal extends Component {
  static propTypes = {
    closeModal: PropTypes.func.isRequired,
  };

  render() {
    return (
      <Modal>
        <FilterForm
          {...this.props}
          onSuccess={this.props.closeModal}
        ></FilterForm>
      </Modal>
    );
  }
}

export default connect(null, { closeModal })(FiltersModal);
