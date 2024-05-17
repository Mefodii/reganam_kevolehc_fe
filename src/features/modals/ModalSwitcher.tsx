import Modal from './Modal';
import ContentWatcherModal from '../contenting/contentWatchers/ContentWatcherModal';
import GroupModal from '../watching/groups/GroupModal';
import VideoModal from '../watching/videos/VideoModal';
import FiltersModal from '../watching/filters/FiltersModal';

import { selectData } from '../../redux/modalSlice';
import { useAppSelector } from '../../hooks';

const ModalSwitcher = () => {
  // TODO: maybe it will be easier to have a useModal hook

  const data = useAppSelector(selectData);

  if (data.modalType === 'CONTENT_WATCHER_MODAL')
    return <ContentWatcherModal {...data.props} />;
  if (data.modalType === 'GROUP_MODAL') return <GroupModal {...data.props} />;
  if (data.modalType === 'VIDEO_MODAL') return <VideoModal {...data.props} />;
  if (data.modalType === 'WATCHING_FILTER_MODAL') return <FiltersModal />;

  return (
    <Modal>
      <div>Undefined modal type: {data.modalType}</div>
    </Modal>
  );
};

export default ModalSwitcher;
