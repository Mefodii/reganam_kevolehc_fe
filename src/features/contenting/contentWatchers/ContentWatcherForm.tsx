import React, { useCallback } from 'react';
import {
  ContentCategory,
  ContentWatcherExtension,
  ContentWatcherQuality,
  ContentWatcherSource,
  ContentWatcherStatus,
} from '../../../api/api-utils';
import { Button } from '../../../components/buttons';
import { Checkbox, Date, DropdownSelect, Text } from '../../../components/form';
import { SVGCheck, SVGTrash } from '../../../components/svg';
import { useAppDispatch, useForm } from '../../../hooks';
import { contentWatcher as model } from '../../../models';
import {
  createContentWatcher,
  deleteContentWatcher,
  updateContentWatcher,
} from './contentWatchersSlice';

type ContentWatcherFormProps = {
  formProps: Model.ContentWatcherProps;
  onSuccess: () => void;
};

// TODO: (M) disable file extension / video quality if download is false
// TODO: (M) add fields which will extract YT channel id from a youtube video
export const ContentWatcherForm = React.memo(
  ({ formProps, onSuccess }: ContentWatcherFormProps) => {
    const dispatch = useAppDispatch();
    const isUpdate = formProps.formMode === 'UPDATE';

    const handleCreate = useCallback(
      (newContentWatcher: Model.ContentWatcherSM) => {
        dispatch(createContentWatcher(newContentWatcher))
          .unwrap()
          .then(onSuccess);
      },
      [dispatch, onSuccess]
    );

    const handleUpdate = useCallback(
      (
        updatedContentWatcher: Model.ContentWatcherDM,
        _: any,
        scope?: Redux.Scope
      ) => {
        if (!scope) throw new Error('Scope expected for handleUpdate');

        dispatch(
          updateContentWatcher({
            contentWatcher: updatedContentWatcher,
            scope: scope,
          })
        )
          .unwrap()
          .then(onSuccess);
      },
      [dispatch, onSuccess]
    );

    const handleDelete = (contentWatcher: Model.ContentWatcherDM) => {
      dispatch(deleteContentWatcher(contentWatcher)).unwrap().then(onSuccess);
    };

    const { modelState, onFieldChange, onCreate, onUpdate } = useForm(
      model,
      formProps,
      handleCreate,
      handleUpdate
    );

    const {
      name,
      category,
      watcher_id,
      source_type,
      status,
      download,
      video_quality,
      check_date,
      file_extension,
    } = modelState;

    const title = isUpdate ? `Edit Watcher` : `Add Watcher`;
    return (
      <div className='simple-font form-container'>
        <div className='title'>{title}</div>

        <div className='form-row'>
          <Text
            label='Name'
            name='name'
            value={name}
            onChange={onFieldChange}
          />
        </div>

        <div className='form-row'>
          <Text
            label='Watcher ID'
            name='watcher_id'
            value={watcher_id}
            onChange={onFieldChange}
          />
          <Date
            datetime
            label={`Check Date (UTC-0)`}
            name='check_date'
            value={check_date}
            onChange={onFieldChange}
          />
        </div>

        <div className='form-row'>
          <DropdownSelect
            label='Category'
            name='category'
            value={category}
            options={Object.values(ContentCategory)}
            onChange={onFieldChange}
          />
          <DropdownSelect
            label='Watcher Type'
            name='source_type'
            value={source_type}
            options={Object.values(ContentWatcherSource)}
            onChange={onFieldChange}
          />
        </div>

        <div className='form-row'>
          <DropdownSelect
            label='Status'
            name='status'
            value={status}
            options={Object.values(ContentWatcherStatus)}
            onChange={onFieldChange}
          />
          <DropdownSelect
            label='Extension'
            name='file_extension'
            value={file_extension}
            options={Object.values(ContentWatcherExtension)}
            onChange={onFieldChange}
            nullable
          />
        </div>

        <div className='form-row'>
          <Checkbox
            name='download'
            text={'Download'}
            checked={download}
            onChange={onFieldChange}
          />
          <DropdownSelect
            label='Video Quality'
            name='video_quality'
            value={video_quality}
            options={Object.values(ContentWatcherQuality).filter(
              (val) => !isNaN(Number(val))
            )}
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
  }
);
