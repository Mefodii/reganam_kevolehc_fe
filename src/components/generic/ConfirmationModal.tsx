import React from 'react';
import { Button } from '../buttons';
import { SVGCheck, SVGCross } from '../svg';

export type ConfirmationModalProps = {
  title?: string;
  description?: string;
  onConfirm: () => void;
  onDecline?: () => void;
};

export const ConfirmationModal = React.memo(
  ({ title, description, onConfirm, onDecline }: ConfirmationModalProps) => {
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
  }
);
