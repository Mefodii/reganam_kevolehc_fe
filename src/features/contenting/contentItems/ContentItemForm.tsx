import {
  Number,
  DropdownSelect,
  Text,
  Checkbox,
  Date,
} from '../../../components/form';
import { Button } from '../../../components/buttons';
import { SVGCheck, SVGTrash } from '../../../components/svg';

import {
  createContentItem,
  updateContentItem,
  deleteContentItem,
} from './contentItemsSlice';
import { useAppDispatch } from '../../../hooks';
import { contentItem as model } from '../../../models';
import { useForm } from '../../../hooks';
import { DownloadStatus } from '../../../api/api-utils';
import React, { useCallback } from 'react';

type ContentItemFormProps = {
  formProps: Model.ContentItemProps;
  onSuccess: () => void;
};

const ContentItemForm: React.FC<ContentItemFormProps> = ({
  formProps,
  onSuccess,
}) => {
  const dispatch = useAppDispatch();

  const isUpdate = formProps.formMode === 'UPDATE';

  const handleCreate = useCallback(
    (newContentItem: Model.ContentItemSM) => {
      dispatch(createContentItem(newContentItem)).unwrap().then(onSuccess);
    },
    [dispatch, onSuccess]
  );

  const handleUpdate = useCallback(
    (updatedContentItem: Model.ContentItemDM) => {
      dispatch(updateContentItem(updatedContentItem)).unwrap().then(onSuccess);
    },
    [dispatch, onSuccess]
  );

  const handleDelete = (contentItem: Model.ContentItemDM) => {
    dispatch(deleteContentItem(contentItem)).unwrap().then(onSuccess);
  };

  const { modelState, onFieldChange, onCreate, onUpdate } = useForm(
    model,
    formProps,
    handleCreate,
    handleUpdate
  );

  const {
    item_id,
    url,
    title,
    file_name,
    position,
    download_status,
    published_at,
    consumed,
  } = modelState;

  const formTitle = isUpdate ? `Edit Watcher` : `Add Watcher`;
  return (
    <div className='simple-font form-container'>
      <div className='title'>{formTitle}</div>

      <div className='form-row'>
        <Text
          label='Title'
          name='title'
          value={title}
          onChange={onFieldChange}
        />
      </div>

      <div className='form-row'>
        <Text
          containerClassName='flex-2'
          label='URL'
          name='url'
          value={url}
          onChange={onFieldChange}
        />
        <Text
          containerClassName='flex-1'
          label='Item ID'
          name='item_id'
          value={item_id}
          onChange={onFieldChange}
        />
      </div>

      <div className='form-row'>
        <Text
          containerClassName='flex-2'
          label='File Name'
          name='file_name'
          value={file_name}
          onChange={onFieldChange}
        />
        <Date
          datetime
          containerClassName='flex-1'
          label='Published At'
          name='published_at'
          value={published_at}
          onChange={onFieldChange}
        />
      </div>

      <div className='form-row'>
        <Number
          label='Position'
          name='position'
          value={position}
          onChange={onFieldChange}
          min={1}
        />
        <DropdownSelect
          label='Download Status'
          name='download_status'
          value={download_status}
          options={Object.values(DownloadStatus)}
          onChange={onFieldChange}
        />
        <Checkbox
          name='consumed'
          text='Consumed'
          checked={consumed}
          onChange={onFieldChange}
        />
      </div>

      <div className='flex'>
        {!isUpdate && (
          <Button tooltip='Add Group' onClick={onCreate}>
            <SVGCheck className='w-6 transition-all duration-300' />
          </Button>
        )}

        {isUpdate && (
          <>
            <Button tooltip='Save Changes' onClick={onUpdate}>
              <SVGCheck className='w-6 transition-all duration-300' />
            </Button>
            <Button
              tooltip='Delete Group'
              onClick={() => handleDelete(formProps.item)}
            >
              <SVGTrash className='w-6 transition-all duration-300' />
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default React.memo(ContentItemForm) as typeof ContentItemForm;
