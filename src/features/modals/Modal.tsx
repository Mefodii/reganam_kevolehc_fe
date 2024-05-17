import { SVGXCircle } from '../../components/svg';

import { closeModal, selectIsOpen } from '../../redux/modalSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';

type ModalProps = React.PropsWithChildren & {
  className?: string;
};

const Modal: React.FC<ModalProps> = ({ className = '', children }) => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectIsOpen);

  const close = () => {
    dispatch(closeModal());
  };

  if (!isOpen) return null;

  return (
    <div className='modal'>
      <div className='modal-bg' onClick={close}></div>
      <div className={`modal-card ${className}`}>
        <div
          className='absolute bg-theme-1 rounded-full -right-3 -top-3'
          onClick={close}
        >
          <SVGXCircle className='w-8 simple-clickable' />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
