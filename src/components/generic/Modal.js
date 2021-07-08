import React, { Component } from "react";
import PropTypes from "prop-types";

export class Modal extends Component {
  static propTypes = {
    hideModal: PropTypes.func.isRequired,
    isHidden: PropTypes.bool.isRequired,
    cardWidth: PropTypes.string.isRequired,
  };

  closeModal = () => {
    this.props.hideModal();
  };

  render() {
    if (this.props.isHidden) return null;

    return (
      <div className="modal">
        <div className="modal-bg" onClick={this.closeModal}></div>
        <div className={`${this.props.cardWidth} modal-content`}>
          <div className="modal-close-button" onClick={this.closeModal}>
            X
          </div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Modal;
