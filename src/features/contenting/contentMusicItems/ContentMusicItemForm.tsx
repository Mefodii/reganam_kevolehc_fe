import { Number, DropdownSelect, Text, Date } from '../../../components/form';
import { Button } from '../../../components/buttons';
import { SVGCheck, SVGTrash } from '../../../components/svg';

import {
  createContentMusicItem,
  updateContentMusicItem,
  deleteContentMusicItem,
} from './contentMusicItemsSlice';
import { useAppDispatch } from '../../../hooks';
import { contentMusicItem as model } from '../../../models';
import { useForm } from '../../../hooks';
import { DownloadStatus } from '../../../api/api-utils';
import React, { useCallback } from 'react';

type ContentMusicItemFormProps = {
  formProps: Model.ContentMusicItemProps;
  onSuccess: () => void;
};

const ContentMusicItemForm: React.FC<ContentMusicItemFormProps> = ({
  formProps,
  onSuccess,
}) => {
  const dispatch = useAppDispatch();

  const isUpdate = formProps.formMode === 'UPDATE';

  const handleCreate = useCallback(
    (newContentMusicItem: Model.ContentMusicItemSM) => {
      dispatch(createContentMusicItem(newContentMusicItem))
        .unwrap()
        .then(onSuccess);
    },
    [dispatch, onSuccess]
  );

  const handleUpdate = useCallback(
    (updatedContentMusicItem: Model.ContentMusicItemDM) => {
      dispatch(updateContentMusicItem(updatedContentMusicItem))
        .unwrap()
        .then(onSuccess);
    },
    [dispatch, onSuccess]
  );

  const handleDelete = (contentMusicItem: Model.ContentMusicItemDM) => {
    dispatch(deleteContentMusicItem(contentMusicItem)).unwrap().then(onSuccess);
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

export default React.memo(ContentMusicItemForm) as typeof ContentMusicItemForm;
