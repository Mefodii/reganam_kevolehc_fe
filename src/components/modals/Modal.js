import { connect } from "react-redux";
import React, { Component } from "react";
import PropTypes from "prop-types";

import { closeModal } from "../../actions/modal";

export class Modal extends Component {
  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    data: PropTypes.object.isRequired,
  };

  closeModal = () => {
    this.props.closeModal();
  };

  render() {
    const { isOpen, data, children } = this.props;
    if (!isOpen) return null;

    return (
      <div className="modal">
        <div className="modal-bg" onClick={this.closeModal}></div>
        <div className={`${data?.cardClassName || "w-1/2"} modal-card`}>
          <div className="modal-close-button" onClick={this.closeModal}>
            X
          </div>
          {children}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isOpen: state.modal.isOpen,
  data: state.modal.data,
});

export default connect(mapStateToProps, { closeModal })(Modal);
