import React from 'react';
import { Button } from '../../components/buttons';
import { SVGCheck, SVGCross } from '../../components/svg';

export type ConfirmationModalProps = {
  title?: string;
  description?: string;
  onConfirm: () => void;
  onDecline?: () => void;
};

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  title,
  description,
  onConfirm,
  onDecline,
}) => {
  return (
    <div className='simple-font form-container'>
      <div className='title'>{title}</div>
      <div className='text-xl'>{description}</div>

      <div className='form-row'>
        <Button className='w-full' onClick={onConfirm}>
          <SVGCheck className='w-6' />
          <div>Confirm</div>
        </Button>
        <Button className='w-full' onClick={onDecline}>
          <SVGCross className='w-6' />
          <div>Cancel</div>
        </Button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
