import React, { useState } from 'react';
import { SVGXCircle } from '../../components/svg';

type ModalProps = {
  isOpen: boolean;
  Content?: JSX.Element;
  open: (Content: JSX.Element) => void;
  close: () => void;
};

export const ModalContext = React.createContext<ModalProps>({
  isOpen: false,
  open: () => {},
  close: () => {},
});
ModalContext.displayName = 'ModalContext';

export const ModalProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [Content, setContent] = useState<JSX.Element | undefined>(undefined);
  const close = () => {
    setIsOpen(false);
  };
  const open = (C: JSX.Element) => {
    setIsOpen(true);
    setContent(C);
  };

  const renderModal = () => {
    if (!isOpen) return <></>;

    return (
      <div className='modal'>
        <div className='modal-bg' onClick={close}></div>
        <div className={`modal-card`}>
          <div
            className='absolute bg-theme-1 rounded-full -right-3 -top-3'
            onClick={close}
          >
            <SVGXCircle className='w-8 simple-clickable' />
          </div>
          {Content}
        </div>
      </div>
    );
  };

  return (
    <ModalContext.Provider value={{ isOpen, Content, close, open }}>
      {renderModal()}
      {children}
    </ModalContext.Provider>
  );
};
