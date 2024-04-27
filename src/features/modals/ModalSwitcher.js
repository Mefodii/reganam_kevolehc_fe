import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Modal from './Modal';
import ContentWatcherModal from '../contenting/contentWatchers/ContentWatcherModal';
import GroupModal from '../watching/groups/GroupModal';
import VideoModal from '../watching/videos/VideoModal';
import FiltersModal from '../watching/filters/FiltersModal';

import {
  CREATE_CONTENT_WATCHER_MODAL,
  GROUP_MODAL,
  VIDEO_MODAL,
  WATCHING_FILTER_MODAL,
  selectData,
  selectModalType,
} from '../../redux/modalSlice';

class ModalSwitcher extends Component {
  static propTypes = {
    modalType: PropTypes.string.isRequired,
  };

  render() {
    const { modalType, data } = this.props;

    if (modalType === CREATE_CONTENT_WATCHER_MODAL)
      return <ContentWatcherModal {...data} />;
    if (modalType === GROUP_MODAL) return <GroupModal {...data} />;
    if (modalType === VIDEO_MODAL) return <VideoModal {...data} />;
    if (modalType === WATCHING_FILTER_MODAL) return <FiltersModal {...data} />;

    return (
      <Modal>
        <div>Undefined modal type: {this.props.modalType}</div>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  modalType: selectModalType(state),
  data: selectData(state),
});

export default connect(mapStateToProps, null)(ModalSwitcher);
