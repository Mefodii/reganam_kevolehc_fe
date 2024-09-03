import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ContentMusic, DownloadStatus } from '../../../api/api-utils';
import { Button } from '../../../components/buttons';
import {
  Checkbox,
  Date,
  DropdownSelect,
  Number,
  Text,
} from '../../../components/form';
import { SVGCheck, SVGCross, SVGTrash } from '../../../components/svg';
import {
  useAppDispatch,
  useAppSelector,
  useDrop,
  useForm,
  useModal,
} from '../../../hooks';
import { UseDropProps } from '../../../hooks/useDrop';
import { contentMusicItem as model } from '../../../models';
import { DnDTypes } from '../../../util/constants';
import { TrackSearch } from '../../listening/tracks/TrackSearch';
import { TracksTable } from '../../listening/tracks/TracksTable';
import {
  selectAllTracks,
  selectPageInfo,
} from '../../listening/tracks/tracksSlice';
import {
  createContentMusicItem,
  deleteContentMusicItem,
  updateContentMusicItem,
} from './contentMusicItemsSlice';

type ContentMusicItemFormProps = {
  formProps: Model.ContentMusicItemProps;
  onSuccess: () => void;
};

export const ContentMusicItemForm = React.memo(
  ({ formProps, onSuccess }: ContentMusicItemFormProps) => {
    const dispatch = useAppDispatch();
    const { setModalClassName } = useModal();

    const tracks = useAppSelector(selectAllTracks);
    const tracksPageInfo = useAppSelector(selectPageInfo);

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
      dispatch(deleteContentMusicItem(contentMusicItem))
        .unwrap()
        .then(onSuccess);
    };

    const { modelState, onFieldChange, onCreate, onUpdate, setModelState } =
      useForm(model, formProps, handleCreate, handleUpdate);

    const [singleTrack, setSingleTrack] = useState<Model.TrackDM | null>(() => {
      if (isUpdate && formProps.item.type === ContentMusic.SINGLE) {
        return formProps.item.tracks[0].track;
      }
      return null;
    });

    const dropProps: UseDropProps<HTMLDivElement, Model.TrackDM> = useMemo(
      () => ({
        accepted: DnDTypes.TRACK,
        onDrop: (e, item) => {
          setSingleTrack(item);
          setModelState({ ...modelState, single_track: item.id });
        },
      }),
      [modelState, setModelState]
    );
    const { isDragOver, dropEvents } = useDrop(dropProps);

    const {
      item_id,
      url,
      title,
      file_name,
      position,
      download_status,
      published_at,
      comment,
      type,
    } = modelState;

    useEffect(() => {
      if (type === ContentMusic.SINGLE) {
        setModalClassName('w-3/5');
      } else {
        setModalClassName('');
      }
    }, [type, setModalClassName, isUpdate]);

    useEffect(() => {
      if (isUpdate && model.isSingle(formProps.item)) {
        setSingleTrack(formProps.item.tracks[0].track);
      }
    }, [isUpdate, formProps]);

    const handleSelectContentMusic = (selectedType: ContentMusic) => {
      if (selectedType === type) return;

      setModelState({ ...modelState, type: selectedType });
    };

    const formTitle = isUpdate ? `Edit Music Item` : `Add Music Item`;
    return (
      <div className='simple-font form-container'>
        <div className='title'>{formTitle}</div>

        <div className='form-row'>
          <div className='flex w-full justify-center space-x-6 py-4'>
            <div>Select Type: </div>
            {Object.values(ContentMusic).map((value) => (
              <Checkbox
                key={value}
                className='rounded-none px-2 border-opacity-70'
                name='type'
                text={value}
                checked={type === value}
                onChange={() => handleSelectContentMusic(value)}
                simple
              />
            ))}
          </div>
        </div>

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
            label='Comment'
            name='comment'
            value={comment}
            onChange={onFieldChange}
          />
        </div>

        <div className='form-row'>
          <Text
            label='File Name'
            name='file_name'
            value={file_name}
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
          <Date
            datetime
            label='Published At'
            name='published_at'
            value={published_at}
            onChange={onFieldChange}
          />
        </div>

        {type === ContentMusic.SINGLE && (
          <div className='flex flex-col my-4'>
            <div className='form-row my-2 items-center'>
              <div className='mr-4 whitespace-nowrap'>Selected Track: </div>
              <div
                className={`w-full h-10 border-2 border-theme-3 flex justify-between items-center px-2 ${
                  isDragOver && 'brightness-150'
                }`}
                {...dropEvents}
              >
                <div
                  className={`px-2 ${
                    singleTrack ? '' : 'underline text-warning-1'
                  }`}
                >
                  {singleTrack ? singleTrack.full_name : '<Default Track>'}
                </div>
                {singleTrack && (
                  <SVGCross
                    className='row-icon'
                    onClick={() => {
                      setSingleTrack(null);
                      setModelState({ ...modelState, single_track: null });
                    }}
                  />
                )}
              </div>
            </div>

            <div className='form-row'>
              <TrackSearch />
            </div>

            <div className='flex w-full overflow-hidden max-h-120 my-2'>
              <TracksTable tracks={tracks} pageInfo={tracksPageInfo} />
            </div>
          </div>
        )}

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
