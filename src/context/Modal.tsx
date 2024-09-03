import React, { useCallback, useMemo, useState } from 'react';
import { ConfirmationModal } from '../components/generic';
import { ConfirmationModalProps } from '../components/generic/ConfirmationModal';
import { SVGXCircle } from '../components/svg';

type ModalProps = {
  isOpen: boolean;
  open: (Content: JSX.Element, className?: string) => void;
  setClassName: (className: string) => void;
  openConfirmation: (props: ConfirmationModalProps) => void;
  close: () => void;
};

export const ModalContext = React.createContext<ModalProps>({
  isOpen: false,
  open: () => {},
  setClassName: () => {},
  openConfirmation: () => {},
  close: () => {},
});
ModalContext.displayName = 'ModalContext';

type ModalContent = {
  Component: JSX.Element;
  className: string;
};
export const ModalProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [modals, setModals] = useState<ModalContent[]>([]);

  const setClassName = useCallback((className: string) => {
    setModals((value) => {
      const lastModal = value.at(-1);
      if (!lastModal) {
        return value;
      }

      return [
        ...value.splice(0, value.length - 1),
        { ...lastModal, className },
      ];
    });
  }, []);

  const close = useCallback(() => {
    setModals((value) => {
      if (value.length === 0) return value;

      return [...value.splice(0, value.length - 1)];
    });
  }, []);

  const open = useCallback((Component: JSX.Element, className?: string) => {
    setModals((value) => [...value, { Component, className: className || '' }]);
  }, []);

  const openConfirmation = useCallback(
    ({ title, description, onConfirm, onDecline }: ConfirmationModalProps) => {
      open(
        <ConfirmationModal
          title={title}
          description={description}
          onConfirm={onConfirm}
          onDecline={onDecline}
        ></ConfirmationModal>
      );
    },
    [open]
  );

  const renderModal = () => {
    if (modals.length === 0) return <></>;

    return (
      <div className='modal'>
        <div className='modal-bg' onClick={close}></div>
        <div className={`modal-card ${modals.at(-1)?.className}`}>
          <div
            className='absolute bg-theme-1 rounded-full -right-3 -top-3'
            onClick={close}
          >
            <SVGXCircle className='w-8 simple-clickable-1' />
          </div>
          <div className='max-h-screen-90 overflow-y-auto'>
            {modals.map((modal, i) => {
              return (
                <div
                  className={` ${i === modals.length - 1 ? '' : 'hidden'}`}
                  key={i}
                >
                  {modal.Component}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const contextValue = useMemo(() => {
    return {
      isOpen: modals.length > 0,
      close,
      open,
      openConfirmation,
      setClassName,
    };
  }, [close, modals, openConfirmation, open, setClassName]);

  return (
    <ModalContext.Provider value={contextValue}>
      {renderModal()}
      {children}
    </ModalContext.Provider>
  );
};
