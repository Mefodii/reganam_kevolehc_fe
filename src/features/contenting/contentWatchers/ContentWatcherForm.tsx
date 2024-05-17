import { BLANK_VALUE } from '../../../util/constants';

import { Date, Number, DropdownSelect, Text } from '../../../components/form';
import { Button } from '../../../components/buttons';
import { SVGCheck, SVGTrash } from '../../../components/svg';

import {
  selectFileExtensionTypes,
  selectContentWatcherSourceTypes,
  selectContentWatcherStatusTypes,
} from '../info/infoSlice';
import {
  createContentWatcher,
  updateContentWatcher,
  deleteContentWatcher,
} from './contentWatchersSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { contentWatcher as model } from '../../../models';
import { useForm } from '../../../hooks/useForm';

type ContentWatcherFormProps = {
  formProps: Model.ContentWatcherProps;
  onSuccess: () => void; // TODO - is this too generic?
};

const ContentWatcherForm: React.FC<ContentWatcherFormProps> = ({
  formProps,
  onSuccess,
}) => {
  const dispatch = useAppDispatch();

  const sourceTypes = useAppSelector(selectContentWatcherSourceTypes);
  const statusTypes = useAppSelector(selectContentWatcherStatusTypes);
  const extensionTypes = useAppSelector(selectFileExtensionTypes);

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
    const [updatedContentWatcher, equals, isValid, error] =
      model.validateUpdate(modelState, model.getDBState(formProps));
    if (!isValid) {
      setFormErrors(error);
      return;
    }
    if (!isValid || equals) return;

    dispatch(updateContentWatcher(updatedContentWatcher)).then(onSuccess);
  };

  const handleDelete = (contentWatcher: Model.ContentWatcherDM) => {
    dispatch(deleteContentWatcher(contentWatcher)).then(onSuccess);
  };

  const {
    name,
    watcher_id,
    source_type,
    status,
    check_date,
    download_count,
    file_extension,
  } = modelState;

  const title = isUpdate ? `Edit Watcher` : `Add Watcher`;
  return (
    // TODO -> to tailwind classname
    <div className='simple-font p-4 justify-evenly bg-theme-2 border-2 border-theme-3 rounded-xl shadow-lg w-full'>
      <div className='title'>{title}</div>

      <div className='form-row'>
        <Text label='Name' name='name' value={name} onChange={onFieldChange} />
        <Text
          label='Watcher ID'
          name='watcher_id'
          value={watcher_id}
          onChange={onFieldChange}
        />
      </div>

      <div className='form-row'>
        <Date
          label={`Check Date (UTC-0)`}
          name='check_date'
          value={check_date}
          onChange={onFieldChange}
        />
        <Number
          label='Count'
          name='download_count'
          value={download_count}
          onChange={onFieldChange}
        />
      </div>

      <div className='form-row'>
        <DropdownSelect
          label='Watcher Type'
          name='source_type'
          value={source_type}
          placeholder={BLANK_VALUE}
          options={sourceTypes}
          onChange={onFieldChange}
        />
        <DropdownSelect
          label='Status'
          name='status'
          value={status}
          placeholder={BLANK_VALUE}
          options={statusTypes}
          onChange={onFieldChange}
        />
        <DropdownSelect
          label='Extension'
          name='file_extension'
          value={file_extension}
          placeholder={BLANK_VALUE}
          options={extensionTypes}
          onChange={onFieldChange}
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

export default ContentWatcherForm;
