import { connect } from "react-redux";
import React, { Component } from "react";
import PropTypes from "prop-types";

import { closeModal } from "../../actions/modal";
import SVGXCircle from "../generic/svg/SVGXCircle";

export class Modal extends Component {
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
      <div className="modal">
        <div className="modal-bg" onClick={this.closeModal}></div>
        <div
          className={`modal-card relative ${className} ${data?.cardClassName}`}
        >
          <div
            className="absolute bg-theme-1 rounded-full -right-3 -top-3"
            onClick={this.closeModal}
          >
            <SVGXCircle className="w-8 simple-clickable" />
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
