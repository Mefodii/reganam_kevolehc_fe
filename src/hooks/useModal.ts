import { useContext } from 'react';
import { ModalContext } from '../features/modals/Modal';

export const useModal = () => {
  const { open, close } = useContext(ModalContext);
  const closeModal = close;
  const openModal = open;

  return { closeModal, openModal };
};
