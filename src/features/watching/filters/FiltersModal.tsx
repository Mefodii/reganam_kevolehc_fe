import Modal from '../../modals/Modal';
import FilterForm from './FilterForm';

import { closeModal } from '../../../redux/modalSlice';
import { selectWatchingFilter } from './filtersSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks';

const FiltersModal = () => {
  const dispatch = useAppDispatch();
  const watchingFilter = useAppSelector(selectWatchingFilter);

  return (
    <Modal>
      <FilterForm
        onSuccess={() => dispatch(closeModal())}
        watchingFilter={watchingFilter}
      ></FilterForm>
    </Modal>
  );
};
export default FiltersModal;
