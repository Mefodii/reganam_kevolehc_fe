import { SVGCheck, SVGTrash } from '../../../components/svg';
import {
  Date,
  TextAreaList,
  Text,
  DropdownSelect,
  TextArea,
  Number,
} from '../../../components/form';
import { Button } from '../../../components/buttons';

import {
  createVideo,
  deleteVideo,
  updateVideo,
  updateVideoSimple,
} from '../groups/groupsSlice';
import { video as model } from '../../../models';
import { useAppDispatch } from '../../../hooks';
import { useForm } from '../../../hooks';
import { WatchingStatus } from '../../../api/api-utils';
import React, { useCallback } from 'react';

type VideoFormProps = {
  formProps: Model.VideoProps;
  onSuccess: () => void;
};

const VideoForm: React.FC<VideoFormProps> = ({ formProps, onSuccess }) => {
  const dispatch = useAppDispatch();
  const isUpdate = formProps.formMode === 'UPDATE';

  const handleCreate = useCallback(
    (newVideo: Model.VideoSM) => {
      dispatch(createVideo(newVideo)).unwrap().then(onSuccess);
    },
    [dispatch, onSuccess]
  );

  const handleUpdate = useCallback(
    (updatedVideo: Model.VideoDM, originalVideo: Model.VideoDM) => {
      if (updatedVideo.position !== originalVideo.position) {
        dispatch(updateVideoSimple(updatedVideo)).unwrap().then(onSuccess);
      } else {
        dispatch(updateVideo(updatedVideo)).unwrap().then(onSuccess);
      }
    },
    [dispatch, onSuccess]
  );

  const handleDelete = (video: Model.VideoDM) => {
    dispatch(deleteVideo(video)).unwrap().then(onSuccess);
  };

  const { modelState, setModelState, onFieldChange, onCreate, onUpdate } =
    useForm(model, formProps, handleCreate, handleUpdate);

  const setCurrentEpisodeMax = () => {
    setModelState({ ...modelState, current_episode: modelState.episodes });
  };

  const {
    name,
    comment,
    aliases,
    links,
    year,
    status,
    watched_date,
    position,
    current_episode,
    episodes,
    rating,
  } = modelState;

  const title = isUpdate ? 'Edit Video' : 'Add Video';

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

      <div className='form-row'>
        <Text
          label='Comment'
          name='comment'
          value={comment}
          onChange={onFieldChange}
        />
        <Number
          label='Position'
          name='position'
          value={position}
          onChange={onFieldChange}
          min={1}
        />
        <DropdownSelect
          className='text-center'
          label='Watch status'
          name='status'
          placeholder='Select status'
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
      </div>

      <div className='form-row'>
        <Number
          label='Year'
          name='year'
          value={year}
          onChange={onFieldChange}
        />
        <div className='w-full relative'>
          <Number
            label='Current ep.'
            name='current_episode'
            value={current_episode}
            onChange={onFieldChange}
          />
          <div
            className='absolute right-1 top-1'
            onClick={setCurrentEpisodeMax}
          >
            <SVGCheck className='w-5 simple-clickable-1'></SVGCheck>
          </div>
        </div>
        <Number
          label='Episodes'
          name='episodes'
          value={episodes}
          onChange={onFieldChange}
        />
        <Number
          label='Rating'
          name='rating'
          value={rating}
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

      <div className='flex'>
        {!isUpdate && (
          <Button tooltip='Add Video' onClick={onCreate}>
            <SVGCheck className='w-6 transition-all duration-300' />
          </Button>
        )}

        {isUpdate && (
          <>
            <Button tooltip='Save Changes' onClick={onUpdate}>
              <SVGCheck className='w-6 transition-all duration-300' />
            </Button>
            <Button
              tooltip='Delete Video'
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

export default React.memo(VideoForm) as typeof VideoForm;
