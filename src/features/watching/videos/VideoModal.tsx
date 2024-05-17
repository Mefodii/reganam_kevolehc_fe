import Modal from '../../modals/Modal';
import VideoForm from './VideoForm';

import { closeModal } from '../../../redux/modalSlice';
import { useAppDispatch } from '../../../hooks';

type VideoModalProps = Model.VideoProps;

const VideoModal: React.FC<VideoModalProps> = (props) => {
  const dispatch = useAppDispatch();

  return (
    <Modal>
      <VideoForm formProps={props} onSuccess={() => dispatch(closeModal())} />
    </Modal>
  );
};

export default VideoModal;
