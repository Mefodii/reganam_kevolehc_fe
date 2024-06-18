import { BLANK_VALUE } from '../../../util/constants';

import {
  Date,
  TextAreaList,
  Number,
  TextArea,
  DropdownSelect,
} from '../../../components/form';
import { Button } from '../../../components/buttons';
import {
  SVGCheck,
  SVGTrash,
  SVGPlay,
  SVGForward,
} from '../../../components/svg';

import { createGroup, updateGroup, deleteGroup } from './groupsSlice';
import { group as model } from '../../../models';
import { useAppDispatch } from '../../../hooks';
import { useForm } from '../../../hooks';
import { WatchingAirStatus, WatchingStatus } from '../../../api/api-utils';

type GroupFormProps = {
  formProps: Model.GroupProps;
  onSuccess: (group?: Model.GroupDM) => void;
};

const GroupForm: React.FC<GroupFormProps> = ({ formProps, onSuccess }) => {
  const dispatch = useAppDispatch();
  const isUpdate = formProps.formMode === 'UPDATE';

  const { modelState, onFieldChange, setFormErrors, setModelState } = useForm(
    model.buildState(formProps)
  );

  const handleToggleSingle = () => {
    setModelState(model.toggleSingle(modelState));
  };

  const handleCreate = () => {
    const [newGroup, isValid, error] = model.validateCreate(modelState);
    if (!isValid) {
      setFormErrors(error);
      return;
    }

    dispatch(createGroup(newGroup)).then((res) => {
      onSuccess(res.payload);
    });
  };

  const handleUpdate = () => {
    const [updatedGroup, equals, isValid, error] = model.validateUpdate(
      modelState,
      model.getDBState(formProps)
    );
    if (!isValid) {
      setFormErrors(error);
      return;
    }
    if (!isValid || equals) return;

    dispatch(updateGroup(updatedGroup)).then(() => onSuccess());
  };

  const handleDelete = (group: Model.GroupDM) => {
    dispatch(deleteGroup(group)).then(() => onSuccess());
  };

  const renderSingle = ({
    status,
    rating,
    watched_date,
    year,
  }: Model.GroupSingleSM) => {
    return (
      <div className='form-row'>
        <DropdownSelect
          label='Watch status'
          name='status'
          placeholder={BLANK_VALUE}
          value={status}
          options={Object.values(WatchingStatus)}
          onChange={onFieldChange}
        />
        <Date
          label={`${status || 'Watched '} Date`}
          name='watched_date'
          value={watched_date}
          onChange={onFieldChange}
        />
        <Number
          label='Year'
          name='year'
          value={year}
          onChange={onFieldChange}
        />
        <Number
          label='Rating'
          name='rating'
          value={rating}
          onChange={onFieldChange}
          min={0}
          max={10}
        />
      </div>
    );
  };

  const renderNotSingle = ({
    airing_status,
    check_date,
  }: Model.GroupNotSingleSM) => {
    return (
      <div className='form-row'>
        <DropdownSelect
          label='Airing Status'
          name='airing_status'
          placeholder={BLANK_VALUE}
          value={airing_status}
          options={Object.values(WatchingAirStatus)}
          onChange={onFieldChange}
        />
        <Date
          label='Last Check Date'
          name='check_date'
          value={check_date}
          onChange={onFieldChange}
        />
      </div>
    );
  };

  const { single, aliases, links, name } = modelState;
  const title = isUpdate
    ? `Edit ${formProps.watchingType}`
    : `Add ${formProps.watchingType}`;
  return (
    <div className='simple-font form-container'>
      <div className='title'>{title}</div>

      <div className='form-row'>
        <TextArea
          label='Name'
          name='name'
          value={name}
          onChange={onFieldChange}
          copy
          paste
        />
      </div>

      {single ? renderSingle(modelState) : renderNotSingle(modelState)}

      <TextAreaList
        name='aliases'
        itemLabel={(item, i) => `Alias ${i + 1}`}
        items={aliases}
        onChange={onFieldChange}
        addItem={model.addAlias}
        removeItem={model.deleteAlias}
        copy
        paste
      />

      <TextAreaList
        name='links'
        itemLabel={(item, i) => `Link ${i + 1}`}
        items={links}
        onChange={onFieldChange}
        addItem={model.addLink}
        removeItem={model.deleteLink}
        copy
        paste
      />

      <div className='flex justify-between'>
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
                onClick={() => handleDelete(formProps.group)}
              >
                <SVGTrash className='w-6 transition-all duration-300' />
              </Button>
            </>
          )}
        </div>

        <div>
          {!isUpdate && formProps.withToggleSingle && single && (
            <Button tooltip='Single' onClick={handleToggleSingle}>
              <SVGPlay className='w-6 transition-all duration-300' />
            </Button>
          )}
          {!isUpdate && formProps.withToggleSingle && !single && (
            <Button tooltip='Series' onClick={handleToggleSingle}>
              <SVGForward className='w-6 transition-all duration-300' />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupForm;
