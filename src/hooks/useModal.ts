import { useContext } from 'react';
import { ModalContext } from '../features/modals/Modal';
import { ConfirmationModalProps } from '../features/modals/ConfirmationModal';

export const useModal = () => {
  const { open, openConfirmation, close } = useContext(ModalContext);
  const closeModal = close;
  const openModal = open;
  const openConfirmationModal = ({
    title,
    description,
    onConfirm,
    onDecline = close,
  }: ConfirmationModalProps) => {
    openConfirmation({
      title,
      description,
      onDecline,
      onConfirm: () => {
        onConfirm();
        close();
      },
    });
  };

  return { closeModal, openModal, openConfirmationModal };
};
