import React, { useState } from 'react';

import {
  BLANK_VALUE,
  DnDTypes,
  SHORT_BLANK_VALUE,
} from '../../../util/constants';
import { promptNumber } from '../../../util/functions';

import { SVGPencil, SVGCheck } from '../../../components/svg';
import LinkList from '../links/LinkList';

import { createVideo, updateVideo } from '../groups/groupsSlice';
import { useAppDispatch, useDnD } from '../../../hooks';
import { video as videoModel } from '../../../models';
import VideoForm from './VideoForm';
import { useModal } from '../../../hooks';
import { DragDots, ItemPlaceholder, Table } from '../../../components/generic';

type VideoItemProps = {
  video: Model.VideoDM;
};

const VideoItem: React.FC<VideoItemProps> = ({ video }) => {
  const [showDots, setShowDots] = useState(false);

  const dispatch = useAppDispatch();

  const [insertBefore, setInsertBefore] = useState(false);
  const [draggable, setDraggable] = useState(false);

  const { isDragged, isCopying, isDragOver, dndEvents } = useDnD<
    HTMLDivElement,
    Model.VideoDM
  >(DnDTypes.VIDEO, video, {
    accepted: DnDTypes.VIDEO,
    extraValidation: (e, item, copy) => {
      if (item.group !== video.group) return false;
      if (item !== video) return true;
      return copy;
    },
    onDragEnter: (e, item) => setInsertBefore(item.order > video.order),
    onDrop: handleDrop,
  });

  const { openModal, closeModal } = useModal();

  function handleDrop(
    e: React.DragEvent<HTMLDivElement>,
    item: Model.VideoDM,
    copy: boolean
  ) {
    const action = copy ? createVideo : updateVideo;
    dispatch(
      action({
        ...item,
        order: copy && !insertBefore ? video.order + 1 : video.order,
      })
    );
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
      className={`flex ${insertBefore ? 'flex-col' : 'flex-col-reverse'}`}
      draggable={draggable}
      {...dndEvents}
    >
      <ItemPlaceholder
        show={isDragOver}
        className={`h-14 p-2 border-2 shadow-2xl rounded-xl bg-theme-2 border-theme-5 ${
          insertBefore ? 'mb-2' : 'mt-2'
        }`}
      />
      <Table.TRow
        className={`base-font group ${isDragged && 'border-active-1/50'} ${
          isDragged && isCopying && 'brightness-125'
        } ${isDragged && !isCopying && 'opacity-30'}`}
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
        <div className='self-start flex flex-wrap 2xl:flex-nowrap px-3 text-center'>
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
      </Table.TRow>
    </div>
  );
};

export default React.memo(VideoItem) as typeof VideoItem;
