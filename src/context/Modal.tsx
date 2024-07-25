import React, { useState } from 'react';
import { SVGXCircle } from '../components/svg';
import { ConfirmationModal } from '../components/generic';
import { ConfirmationModalProps } from '../components/generic/ConfirmationModal';

type ModalProps = {
  isOpen: boolean;
  Content?: JSX.Element;
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

export const ModalProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [Content, setContent] = useState<JSX.Element | undefined>(undefined);
  const [className, setClassName] = useState('');

  const close = () => {
    setIsOpen(false);
  };
  const open = (Component: JSX.Element, className?: string) => {
    setIsOpen(true);
    setContent(Component);
    setClassName(className || '');
  };

  const openConfirmation = ({
    title,
    description,
    onConfirm,
    onDecline,
  }: ConfirmationModalProps) => {
    setIsOpen(true);
    setContent(
      <ConfirmationModal
        title={title}
        description={description}
        onConfirm={onConfirm}
        onDecline={onDecline}
      ></ConfirmationModal>
    );
  };

  const renderModal = () => {
    if (!isOpen) return <></>;

    return (
      <div className='modal'>
        <div className='modal-bg' onClick={close}></div>
        <div className={`modal-card ${className}`}>
          <div
            className='absolute bg-theme-1 rounded-full -right-3 -top-3'
            onClick={close}
          >
            <SVGXCircle className='w-8 simple-clickable-1' />
          </div>
          {Content}
        </div>
      </div>
    );
  };

  return (
    <ModalContext.Provider
      value={{ isOpen, Content, close, open, openConfirmation, setClassName }}
    >
      {renderModal()}
      {children}
    </ModalContext.Provider>
  );
};
