import React, { useCallback } from 'react';
import { WatchingAirStatus, WatchingStatus } from '../../../api/api-utils';
import { Button } from '../../../components/buttons';
import {
  Date,
  DropdownSelect,
  Number,
  TextArea,
  TextAreaList,
} from '../../../components/form';
import {
  SVGCheck,
  SVGForward,
  SVGPlay,
  SVGTrash,
} from '../../../components/svg';
import { useAppDispatch, useForm } from '../../../hooks';
import { group as model } from '../../../models';
import { BLANK_VALUE } from '../../../util/constants';
import { createGroup, deleteGroup, updateGroup } from './groupsSlice';

type GroupFormProps = {
  formProps: Model.GroupProps;
  onSuccess: (group?: Model.GroupDM) => void;
};

export const GroupForm = React.memo(
  ({ formProps, onSuccess }: GroupFormProps) => {
    const dispatch = useAppDispatch();
    const isUpdate = formProps.formMode === 'UPDATE';

    const handleCreate = useCallback(
      (newGroup: Model.GroupSM) => {
        dispatch(createGroup(newGroup))
          .unwrap()
          .then((group) => {
            onSuccess(group);
          });
      },
      [dispatch, onSuccess]
    );

    const handleUpdate = useCallback(
      (updatedGroup: Model.GroupDM) => {
        dispatch(updateGroup(updatedGroup))
          .unwrap()
          .then(() => onSuccess());
      },
      [dispatch, onSuccess]
    );

    const handleDelete = (group: Model.GroupDM) => {
      dispatch(deleteGroup(group))
        .unwrap()
        .then(() => onSuccess());
    };

    const { modelState, setModelState, onFieldChange, onCreate, onUpdate } =
      useForm(model, formProps, handleCreate, handleUpdate);

    const handleToggleSingle = () => {
      setModelState(model.toggleSingle(modelState));
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
  }
);
