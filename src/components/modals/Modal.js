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
    const { isOpen, data, children, title = "" } = this.props;
    if (!isOpen) return null;

    return (
      <div className="modal">
        <div className="modal-bg" onClick={this.closeModal}></div>
        <div className={`${data?.cardClassName || "w-2/3"} modal-card`}>
          <div className="flex m-2 p-1">
            <div className="w-full text-xl uppercase font-bold text-center">
              {title}
            </div>
            <div
              className="cursor-pointer font-bold hover:text-purple-300 active:text-purple-800"
              onClick={this.closeModal}
            >
              X
            </div>
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
