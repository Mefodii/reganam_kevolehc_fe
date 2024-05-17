import Modal from '../../modals/Modal';
import GroupForm from './GroupForm';

import { closeModal, openVideoModal } from '../../../redux/modalSlice';
import { useAppDispatch } from '../../../hooks';

type GroupModalProps = Model.GroupProps;

const GroupModal: React.FC<GroupModalProps> = (props) => {
  const dispatch = useAppDispatch();

  const onGroupSuccess = (groupCreated = false, group?: Model.GroupDM) => {
    dispatch(closeModal());
    if (groupCreated && group && !group.single) {
      dispatch(
        openVideoModal({
          watchingType: group.type,
          groupId: group.id,
          defaultOrder: 1,
          formMode: 'CREATE',
        })
      );
    }
  };

  return (
    <Modal>
      <GroupForm formProps={props} onSuccess={onGroupSuccess}></GroupForm>
    </Modal>
  );
};

export default GroupModal;
