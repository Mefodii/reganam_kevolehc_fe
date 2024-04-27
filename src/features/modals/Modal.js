import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { SVGXCircle } from '../../components/svg';

import { closeModal, selectData, selectIsOpen } from '../../redux/modalSlice';

class Modal extends Component {
  static propTypes = {
    className: PropTypes.string,
    closeModal: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    data: PropTypes.object.isRequired,
  };

  closeModal = () => {
    this.props.closeModal();
  };

  render() {
    const { isOpen, data, children, className } = this.props;
    if (!isOpen) return null;

    return (
      <div className='modal'>
        <div className='modal-bg' onClick={this.closeModal}></div>
        <div className={`modal-card ${className} ${data?.cardClassName}`}>
          <div
            className='absolute bg-theme-1 rounded-full -right-3 -top-3'
            onClick={this.closeModal}
          >
            <SVGXCircle className='w-8 simple-clickable' />
          </div>
          {children}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isOpen: selectIsOpen(state),
  data: selectData(state),
});

export default connect(mapStateToProps, { closeModal })(Modal);
