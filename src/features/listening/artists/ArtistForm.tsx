import { Checkbox, Date, Text, TextAreaList } from '../../../components/form';
import { Button } from '../../../components/buttons';
import { SVGCheck, SVGTrash } from '../../../components/svg';

import { createArtist, updateArtist, deleteArtist } from './artistsSlice';
import { useAppDispatch } from '../../../hooks';
import { artist as model } from '../../../models';
import { useForm } from '../../../hooks';
import React, { useCallback } from 'react';

type ArtistFormProps = {
  formProps: Model.ArtistProps;
  onSuccess: () => void;
};

const ArtistForm: React.FC<ArtistFormProps> = ({ formProps, onSuccess }) => {
  const dispatch = useAppDispatch();

  const isUpdate = formProps.formMode === 'UPDATE';

  const handleCreate = useCallback(
    (newArtist: Model.ArtistSM) => {
      dispatch(createArtist(newArtist)).unwrap().then(onSuccess);
    },
    [dispatch, onSuccess]
  );

  const handleUpdate = useCallback(
    (updatedArtist: Model.ArtistDM) => {
      dispatch(updateArtist(updatedArtist)).unwrap().then(onSuccess);
    },
    [dispatch, onSuccess]
  );

  const handleDelete = (artist: Model.ArtistDM) => {
    dispatch(deleteArtist(artist)).unwrap().then(onSuccess);
  };

  const { modelState, onFieldChange, onCreate, onUpdate } = useForm(
    model,
    formProps,
    handleCreate,
    handleUpdate
  );

  const { name, aliases, monitoring, check_date, releasing } = modelState;

  const formTitle = isUpdate ? `Edit Music Item` : `Add Music Item`;
  return (
    <div className='simple-font form-container'>
      <div className='title'>{formTitle}</div>

      <div className='form-row'>
        <Text label='Name' name='name' value={name} onChange={onFieldChange} />
      </div>

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

      <div className='form-row'>
        <Checkbox
          text='Monitoring'
          name='monitoring'
          checked={monitoring}
          onChange={onFieldChange}
        />
        <Checkbox
          text='Releasing'
          name='releasing'
          checked={releasing}
          onChange={onFieldChange}
        />
        <Date
          label='Check Date'
          name='check_date'
          value={check_date}
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

export default React.memo(ArtistForm) as typeof ArtistForm;
