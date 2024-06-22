import { useState } from 'react';

import { BLANK_VALUE, SHORT_BLANK_VALUE } from '../../../util/constants';
import { promptNumber } from '../../../util/functions';

import { SVGPencil, SVGCheck } from '../../../components/svg';
import LinkList from '../links/LinkList';

import { createVideo, updateVideo } from '../groups/groupsSlice';
import { useAppDispatch } from '../../../hooks';
import { video as videoModel } from '../../../models';
import VideoForm from './VideoForm';
import { useModal } from '../../../hooks';
import { DragDots, ItemPlaceholder } from '../../../components/generic';
import { useDrag } from '../../../hooks/useDrag';
import { useDrop } from '../../../hooks/useDrop';

type VideoItemProps = {
  video: Model.VideoDM;
};

const validateDragOver = (
  dndData: DragAndDrop.Data<DragAndDrop.VideoDetails>,
  video: Model.VideoDM
): Model.VideoDM | undefined => {
  const { details, copy } = dndData;

  if (!details) return undefined;
  if (details.type !== 'VIDEO_ITEM' || details.item?.group !== video.group)
    return undefined;
  if (details.item.group !== video.group) return undefined;
  if (details.item !== video) return details.item;
  if (copy) return details.item;

  return undefined;
};

const VideoItem: React.FC<VideoItemProps> = ({ video }) => {
  const [showDots, setShowDots] = useState(false);

  const dispatch = useAppDispatch();

  const [insertBefore, setInsertBefore] = useState(false);
  const [draggable, setDraggable] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  const { isDragged, isCopying, dragEvents } = useDrag(
    videoModel.asDnDDetails(video)
  );
  const { dropEvents } = useDrop({
    onDragEnter: handleDragEnter,
    onDragLeave: () => setIsDragOver(false),
    onDrop: handleDrop,
  });

  const { openModal, closeModal } = useModal();

  function handleDragEnter(
    dndData: DragAndDrop.Data<DragAndDrop.VideoDetails>
  ) {
    const draggedItem = validateDragOver(dndData, video);
    if (!draggedItem) return;

    setIsDragOver(true);
    setInsertBefore(draggedItem.order > video.order);
  }

  function handleDrop(dndData: DragAndDrop.Data<DragAndDrop.VideoDetails>) {
    const draggedItem = validateDragOver(dndData, video);
    if (!draggedItem) return;

    const order = dndData.copy && !insertBefore ? video.order + 1 : video.order;
    const newVideo = { ...draggedItem!, order };
    const action = dndData.copy ? createVideo : updateVideo;

    dispatch(action(newVideo));
    setIsDragOver(false);
  }

  const handleOpenEdit = () => {
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

  const handleSetFinished = () => {
    const rating = promptNumber('Set video rating');
    if (rating === undefined) {
      return;
    }
    dispatch(updateVideo(videoModel.setFinished(video, rating)));
  };

  const {
    name,
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
    <div
      className={`flex my-2 ${insertBefore ? 'flex-col' : 'flex-col-reverse'}`}
      draggable={draggable}
      {...dragEvents}
      {...dropEvents}
    >
      <ItemPlaceholder
        show={isDragOver}
        className={`h-14 p-2 border-2 shadow-2xl rounded-xl bg-theme-2 border-theme-5 ${
          insertBefore ? 'mb-2' : 'mt-2'
        }`}
      />
      <div
        className={`flex w-full group 2xl:flex-row p-2 border-2 shadow-2xl rounded-xl bg-theme-2 border-theme-3 ${
          isDragged && 'border-active-1/50'
        } ${isDragged && isCopying && 'brightness-125'} ${
          isDragged && !isCopying && 'opacity-30'
        }`}
        onMouseEnter={() => setShowDots(true)}
        onMouseLeave={() => setShowDots(false)}
      >
        <DragDots
          show={showDots}
          onMouseEnter={() => setDraggable(true)}
          onMouseLeave={() => setDraggable(false)}
        />
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
            } ${videoModel.isPremiere(video) && 'text-warning-1'} ${
              videoModel.isDropped(video) && 'text-error-1'
            }`}
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
            <div className='font-bold'>{`${
              rating ?? SHORT_BLANK_VALUE
            } / 10`}</div>
          </div>
        </div>
        <div>
          <div onClick={handleOpenEdit}>
            <SVGPencil className='w-6 wiggling-clickable'></SVGPencil>
          </div>
          {!videoModel.isFinished(video) && (
            <div onClick={handleSetFinished}>
              <SVGCheck className='w-6 wiggling-clickable'></SVGCheck>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoItem;