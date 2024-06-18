import {
  Date,
  DropdownSelect,
  Text,
  SingleSelect,
} from '../../../components/form';
import { Button } from '../../../components/buttons';
import { SVGCheck, SVGTrash } from '../../../components/svg';

import {
  createContentWatcher,
  updateContentWatcher,
  deleteContentWatcher,
} from './contentWatchersSlice';
import { useAppDispatch } from '../../../hooks';
import { contentWatcher as model } from '../../../models';
import { useForm } from '../../../hooks';
import {
  ContentCategory,
  ContentWatcherExtension,
  ContentWatcherQuality,
  ContentWatcherSource,
  ContentWatcherStatus,
} from '../../../api/api-utils';
import React from 'react';

type ContentWatcherFormProps = {
  formProps: Model.ContentWatcherProps;
  onSuccess: () => void;
};

// TODO: (M) disable file extension / video quality if download is false
// TODO: (M) add fields which will extract YT channel id from a youtube video
const ContentWatcherForm: React.FC<ContentWatcherFormProps> = ({
  formProps,
  onSuccess,
}) => {
  const dispatch = useAppDispatch();

  const isUpdate = formProps.formMode === 'UPDATE';

  const { modelState, onFieldChange, setFormErrors } = useForm(
    model.buildState(formProps)
  );

  const handleCreate = () => {
    const [newContentWatcher, isValid, error] =
      model.validateCreate(modelState);
    if (!isValid) {
      setFormErrors(error);
      return;
    }

    dispatch(createContentWatcher(newContentWatcher)).then(onSuccess);
  };

  const handleUpdate = () => {
    if (!isUpdate) return;

    const [updatedContentWatcher, equals, isValid, error] =
      model.validateUpdate(modelState, model.getDBState(formProps));
    if (!isValid) {
      setFormErrors(error);
      return;
    }
    if (!isValid || equals) return;

    dispatch(
      updateContentWatcher({
        contentWatcher: updatedContentWatcher,
        scope: formProps.scope,
      })
    ).then(onSuccess);
  };

  const handleDelete = (contentWatcher: Model.ContentWatcherDM) => {
    dispatch(deleteContentWatcher(contentWatcher)).then(onSuccess);
  };

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
    // TODO -> to tailwind classname
    <div className='simple-font form-container'>
      <div className='title'>{title}</div>

      <div className='form-row'>
        <Text label='Name' name='name' value={name} onChange={onFieldChange} />
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
        />
      </div>

      <div className='form-row'>
        <SingleSelect
          name='download'
          text={'Download'}
          value={download}
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
          deselect
        />
      </div>

      <div className='flex'>
        {!isUpdate && (
          <Button tooltip='Add Group' onClick={handleCreate}>
            <SVGCheck className='w-6 transition-all duration-300' />
          </Button>
        )}

        {isUpdate && (
          <>
            <Button tooltip='Save Changes' onClick={handleUpdate}>
              <SVGCheck className='w-6 transition-all duration-300' />
            </Button>
            <Button
              tooltip='Delete Group'
              onClick={() => handleDelete(formProps.contentWatcher)}
            >
              <SVGTrash className='w-6 transition-all duration-300' />
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default React.memo(ContentWatcherForm);
