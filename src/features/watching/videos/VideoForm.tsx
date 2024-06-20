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

import { createVideo, deleteVideo, updateVideo } from '../groups/groupsSlice';
import { video as model } from '../../../models';
import { useAppDispatch } from '../../../hooks';
import { useForm } from '../../../hooks';
import { WatchingStatus } from '../../../api/api-utils';

type VideoFormProps = {
  formProps: Model.VideoProps;
  onSuccess: () => void;
};

const VideoForm: React.FC<VideoFormProps> = ({ formProps, onSuccess }) => {
  const dispatch = useAppDispatch();
  const isUpdate = formProps.formMode === 'UPDATE';

  const { modelState, setModelState, onFieldChange, setFormErrors } = useForm(
    model.buildState(formProps)
  );

  const setCurrentEpisodeMax = () => {
    setModelState({ ...modelState, current_episode: modelState.episodes });
  };

  const handleCreate = () => {
    // TODO - looks pretty similar in each form, maybe can be inserted into useForm
    const [newVideo, isValid, error] = model.validateCreate(modelState);
    if (!isValid) {
      setFormErrors(error);
      return;
    }

    dispatch(createVideo(newVideo)).then(onSuccess);
  };

  const handleUpdate = () => {
    const [updatedVideo, equals, isValid, error] = model.validateUpdate(
      modelState,
      model.getDBState(formProps)
    );
    if (!isValid) {
      setFormErrors(error);
      return;
    }
    if (!isValid || equals) return;

    dispatch(updateVideo(updatedVideo)).then(onSuccess);
  };

  const handleDelete = (video: Model.VideoDM) => {
    dispatch(deleteVideo(video)).then(onSuccess);
  };

  const {
    name,
    comment,
    aliases,
    links,
    year,
    status,
    watched_date,
    order,
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
          label='Order'
          name='order'
          value={order}
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
            <SVGCheck className='w-5 simple-clickable'></SVGCheck>
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
          <Button tooltip='Add Video' onClick={handleCreate}>
            <SVGCheck className='w-6 transition-all duration-300' />
          </Button>
        )}

        {isUpdate && (
          <>
            <Button tooltip='Save Changes' onClick={handleUpdate}>
              <SVGCheck className='w-6 transition-all duration-300' />
            </Button>
            <Button
              tooltip='Delete Video'
              onClick={() => handleDelete(formProps.video)}
            >
              <SVGTrash className='w-6 transition-all duration-300' />
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default VideoForm;
