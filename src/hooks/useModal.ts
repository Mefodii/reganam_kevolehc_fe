import { useContext } from 'react';
import { ModalContext } from '../context';
import { ConfirmationModalProps } from '../components/generic/ConfirmationModal';

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
