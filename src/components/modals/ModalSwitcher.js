import { connect } from "react-redux";
import React, { Component } from "react";
import PropTypes from "prop-types";

import {
  CREATE_CONTENT_WATCHER_MODAL,
  GROUP_MODAL,
  VIDEO_MODAL,
  WATCHIO_FILTER_MODAL,
} from "../../actions/modal";
import ContentWatcherModal from "./ContentWatcherModal";
import Modal from "./Modal";
import GroupModal from "./GroupModal";
import VideoModal from "./VideoModal";
import WatchioFilterModal from "./WatchioFilterModal";

export class ModalSwitcher extends Component {
  static propTypes = {
    modalType: PropTypes.string.isRequired,
  };

  render() {
    const { modalType, data } = this.props;

    switch (modalType) {
      case CREATE_CONTENT_WATCHER_MODAL:
        return <ContentWatcherModal {...data} />;
      case GROUP_MODAL:
        return <GroupModal {...data} />;
      case VIDEO_MODAL:
        return <VideoModal {...data} />;
      case WATCHIO_FILTER_MODAL:
        return <WatchioFilterModal {...data} />;
      default:
        return (
          <Modal>
            <div>Undefined modal type: {this.props.modalType}</div>
          </Modal>
        );
    }
  }
}

const mapStateToProps = (state) => ({
  modalType: state.modal.modalType,
  data: state.modal.data,
});

export default connect(mapStateToProps, null)(ModalSwitcher);
