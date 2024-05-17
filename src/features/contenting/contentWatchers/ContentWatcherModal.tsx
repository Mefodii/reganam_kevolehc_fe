import Modal from '../../modals/Modal';
import ContentWatcherForm from './ContentWatcherForm';

import { closeModal } from '../../../redux/modalSlice';
import { useAppDispatch } from '../../../hooks';

type ContentWatcherModalProps = Model.ContentWatcherProps;

const ContentWatcherModal: React.FC<ContentWatcherModalProps> = (props) => {
  const dispatch = useAppDispatch();

  return (
    <Modal>
      <ContentWatcherForm
        formProps={props}
        onSuccess={() => dispatch(closeModal())}
      ></ContentWatcherForm>
    </Modal>
  );
};

export default ContentWatcherModal;
