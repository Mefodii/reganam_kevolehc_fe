import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Modal from './Modal';

import { closeModal } from '../../actions/modal';
import FilterForm from '../forms/FilterForm';

export class WatchingFilterModal extends Component {
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

export default connect(null, { closeModal })(WatchingFilterModal);
