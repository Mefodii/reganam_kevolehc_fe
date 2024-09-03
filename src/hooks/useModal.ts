import { useContext, useMemo } from 'react';
import { ConfirmationModalProps } from '../components/generic/ConfirmationModal';
import { ModalContext } from '../context';

export const useModal = () => {
  const { open, openConfirmation, close, setClassName } =
    useContext(ModalContext);

  const result = useMemo(() => {
    return {
      closeModal: close,
      openModal: open, // Note 2024-07-28: the component props are not "reactive". E.g. onSuccess={closeModal} will have the closeModal reference before it was oppened
      openConfirmationModal: ({
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
            // TODO: (H) - probably onConfirm and onDecline can be optional and both will call close()
            onConfirm();
            close();
          },
        });
      },
      setModalClassName: setClassName,
    };
  }, [close, open, openConfirmation, setClassName]);

  return result;
};
