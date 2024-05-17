import { useState } from 'react';

import { BLANK_VALUE } from '../../../util/constants';
import { promptNumber } from '../../../util/functions';

import { SVGPencil, SVGCheck, SVGVerticalDots } from '../../../components/svg';
import VideoItemPlaceholder from './VideoItemPlaceholder';
import { DragAndDrop } from '../../../components/dragAndDrop';
import LinkList from '../links/LinkList';

import { createVideo, updateVideo } from '../groups/groupsSlice';
import { useAppDispatch } from '../../../hooks';
import { video as videoModel } from '../../../models';
import VideoForm from './VideoForm';
import { useModal } from '../../../hooks/useModal';
type VideoItemProps = {
  video: Model.VideoDM;
  watchingType: string;
  lastItem?: boolean;
};

const VideoItem: React.FC<VideoItemProps> = ({
  video,
  watchingType,
  lastItem = false,
}) => {
  const dispatch = useAppDispatch();

  const [draggable, setDraggable] = useState(false);
  const [insertBefore, setInsertBefore] = useState(false);
  const [drag, setDrag] = useState({
    dragged: false,
    dragCopy: false,
    dragOver: false,
    dragOverCopy: false,
  });

  const { openModal, closeModal } = useModal();

  // TODO - probably all these drag events can be generic into a hook. Investigate later
  const onDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    dndData: DragAndDrop.Data
  ) => {
    setDrag({ ...drag, dragged: true, dragCopy: dndData.copy });
  };

  const onDragEnd = () => {
    setDrag({ ...drag, dragged: false, dragCopy: false });
  };

  const onDragEnter = (dndData: DragAndDrop.Data) => {
    if (!isValidDragOver(dndData)) return;

    const { item, copy } = dndData;
    setDrag({ ...drag, dragOver: true, dragOverCopy: copy });
    setInsertBefore(item!.order > video.order);
  };

  const onDragLeave = (dndData: DragAndDrop.Data) => {
    setDrag({ ...drag, dragOver: false, dragOverCopy: false });
  };

  const onDragOver = (dndData: DragAndDrop.Data) => {};

  const isValidDragOver = (dndData: DragAndDrop.Data) => {
    const { item, type, copy } = dndData;

    if (type !== 'VIDEO_ITEM' || item?.group !== video.group) return false;
    if (item !== video) return true;

    return copy;
  };

  const onDrop = (dndData: DragAndDrop.Data) => {
    if (!drag.dragOver) return;
    setDrag({ ...drag, dragOver: false });

    const newVideo = { ...dndData.item!, order: video.order };
    const action = dndData.copy ? createVideo : updateVideo;

    dispatch(action(newVideo));
  };

  const openEdit = () => {
    openModal(
      <VideoForm
        formProps={{
          video,
          formMode: 'UPDATE',
        }}
        onSuccess={() => closeModal()}
      />
    );
  };

  const setFinised = () => {
    const rating = promptNumber('Set video rating');
    if (rating === undefined) {
      return;
    }

    const newVideo = {
      ...videoModel.setFinished(video),
      rating,
    };
    dispatch(updateVideo(newVideo));
  };

  const { dragOver, dragged, dragCopy } = drag;
  const {
    name,
    group,
    comment,
    aliases,
    links,
    status,
    watched_date,
    year,
    current_episode,
    episodes,
    rating,
  } = video;

  return (
    <DragAndDrop
      draggable={draggable}
      accessGroup={group}
      item={video}
      type={'VIDEO_ITEM'}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <div
        className={`flex my-2 ${
          insertBefore ? 'flex-col' : 'flex-col-reverse'
        }`}
      >
        <VideoItemPlaceholder
          className={`${insertBefore ? 'mb-2' : 'mt-2'}`}
          show={dragOver}
        />
        <div
          className={`flex w-full group 2xl:flex-row p-2 border-2 shadow-2xl rounded-xl bg-theme-2 border-theme-3 ${
            dragged && 'border-active-1/50'
          } ${dragged && dragCopy && 'brightness-125'} ${
            dragged && !dragCopy && 'opacity-30'
          }`}
        >
          <div
            className='my-auto cursor-pointer w-3 pr-2 text-text-1/20'
            onMouseEnter={() => setDraggable(true)}
            onMouseLeave={() => setDraggable(false)}
          >
            <SVGVerticalDots className='w-1' />
          </div>
          <div className='simple-font w-full break-all'>
            <div className='text-xl font-bold'>
              {name}
              {comment && (
                <div className='inline ml-2 opacity-60'>[{comment}]</div>
              )}
            </div>

            <LinkList links={links} />

            {aliases.length > 0 && (
              <div className='mt-3'>
                <div className='text-xs'>Alias:</div>
                <div>
                  {aliases.map((alias, i) => (
                    <div key={i}>{' - ' + alias}</div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className='flex flex-wrap 2xl:flex-nowrap px-3 text-center'>
            <div
              className={`w-24 m-1 ${
                videoModel.isInQueue(video) && 'text-active-2'
              } ${videoModel.isPremiere(video) && 'text-warning-1'}`}
            >
              <div className='text-xs'>Status</div>
              <div className='font-bold'>{status}</div>
            </div>
            <div className='w-24 m-1'>
              <div className='text-xs'>{status || 'Watched '} Date</div>
              <div className='font-bold'>{watched_date || BLANK_VALUE}</div>
            </div>
            <div className='w-24 m-1'>
              <div className='text-xs'>Episodes</div>
              <div className='font-bold'>
                {current_episode} / {episodes}
              </div>
            </div>
            <div className='w-24 m-1'>
              <div className='text-xs'>Year</div>
              <div className='font-bold'>{year || '----'}</div>
            </div>
            <div className='w-24 m-1'>
              <div className='text-xs'>Rating</div>
              <div className='font-bold'>{`${rating} / 10`}</div>
            </div>
          </div>
          <div>
            <div onClick={openEdit}>
              <SVGPencil className='w-6 wiggling-clickable'></SVGPencil>
            </div>
            {!videoModel.isFinished(video) && (
              <div onClick={setFinised}>
                <SVGCheck className='w-6 wiggling-clickable'></SVGCheck>
              </div>
            )}
          </div>
        </div>
      </div>
    </DragAndDrop>
  );
};

export default VideoItem;
