import {
  Checkbox,
  DropdownSelect,
  List,
  Text,
  TextAreaList,
} from '../../../components/form';
import { Button } from '../../../components/buttons';
import { SVGCheck, SVGTrash } from '../../../components/svg';

import { createTrack, updateTrack, deleteTrack } from './tracksSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { track as model } from '../../../models';
import { useForm } from '../../../hooks';
import React, { useCallback } from 'react';
import { TrackStatus } from '../../../api/api-utils';
import { BLANK_VALUE, DnDTypes } from '../../../util/constants';
import ArtistSearch from '../artists/ArtistSearch';
import ArtistsTable from '../artists/ArtistsTable';
import { selectAllArtists, selectPageInfo } from '../artists/artistsSlice';

type TrackFormProps = {
  formProps: Model.TrackProps;
  onSuccess: () => void;
};

const TrackForm: React.FC<TrackFormProps> = ({ formProps, onSuccess }) => {
  const dispatch = useAppDispatch();

  const artistsDB = useAppSelector(selectAllArtists);
  const artistsPageInfo = useAppSelector(selectPageInfo);

  const isUpdate = formProps.formMode === 'UPDATE';

  const handleCreate = useCallback(
    (newTrack: Model.TrackSM) => {
      dispatch(createTrack(newTrack)).unwrap().then(onSuccess);
    },
    [dispatch, onSuccess]
  );

  const handleUpdate = useCallback(
    (updatedTrack: Model.TrackDM) => {
      dispatch(updateTrack(updatedTrack)).unwrap().then(onSuccess);
    },
    [dispatch, onSuccess]
  );

  const handleDelete = (track: Model.TrackDM) => {
    dispatch(deleteTrack(track)).unwrap().then(onSuccess);
  };

  const { modelState, onFieldChange, onCreate, onUpdate } = useForm(
    model,
    formProps,
    handleCreate,
    handleUpdate
  );

  const {
    title,
    aliases,
    status,
    is_clean,
    double_checked,
    artists,
    feat,
    remix,
    cover,
  } = modelState;

  const formTitle = isUpdate ? `Edit Track` : `Add Track`;
  return (
    <div className='simple-font form-container'>
      <div className='title'>{formTitle}</div>

      <div className='form-row'>
        <List
          label='Artists'
          name='artists'
          dropType={DnDTypes.ARTIST}
          items={artists}
          onChange={onFieldChange}
          itemDisplay={(item, i) => item.name}
        />
      </div>

      <div className='form-row'>
        <Text
          label='Title'
          name='title'
          value={title}
          onChange={onFieldChange}
        />
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
        <List
          label='Feats'
          name='feat'
          dropType={DnDTypes.ARTIST}
          items={feat}
          onChange={onFieldChange}
          itemDisplay={(item, i) => item.name}
        />
      </div>

      <div className='form-row'>
        <List
          label='Remixed by'
          name='remix'
          dropType={DnDTypes.ARTIST}
          items={remix}
          onChange={onFieldChange}
          itemDisplay={(item, i) => item.name}
        />
      </div>

      <div className='form-row'>
        <List
          label='Cover'
          name='cover'
          dropType={DnDTypes.ARTIST}
          items={cover}
          onChange={onFieldChange}
          itemDisplay={(item, i) => item.name}
        />
      </div>

      <div className='form-row'>
        <DropdownSelect
          label='Status'
          name='status'
          placeholder={BLANK_VALUE}
          value={status}
          options={Object.values(TrackStatus)}
          onChange={onFieldChange}
        />
        <Checkbox
          text='Clean'
          name='is_clean'
          checked={is_clean}
          onChange={onFieldChange}
        />
        <Checkbox
          text='Double Checked'
          name='double_checked'
          checked={double_checked}
          onChange={onFieldChange}
        />
      </div>

      <div className='form-row'>
        <ArtistSearch />
      </div>

      <div className='flex w-full overflow-hidden max-h-120 my-2'>
        <ArtistsTable artists={artistsDB} pageInfo={artistsPageInfo} />
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

export default React.memo(TrackForm) as typeof TrackForm;
