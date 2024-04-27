import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { BLANK_VALUE, DRAG_VIDEO_ITEM } from '../../../util/constants';
import { promptNumber } from '../../../util/functions';

import { SVGPencil, SVGCheck, SVGVerticalDots } from '../../../components/svg';
import VideoModel from '../../../models/video';
import VideoItemPlaceholder from './VideoItemPlaceholder';
import { DragAndDrop } from '../../../components/dragAndDrop';
import LinkList from '../links/LinkList';

import { createVideo, updateVideo } from '../groups/groupsSlice';
import { openVideoModal } from '../../../redux/modalSlice';

class VideoItem extends Component {
  static propTypes = {
    video: PropTypes.object.isRequired,
    watchingType: PropTypes.string.isRequired,
    createVideo: PropTypes.func.isRequired,
    updateVideo: PropTypes.func.isRequired,
    lastItem: PropTypes.bool,
  };

  static defaultProps = {
    lastItem: false,
  };

  state = {
    edit: false,
    draggable: false,
    dragged: false,
    dragCopy: false,
    dragOver: false,
    dragOverCopy: false,
    insertBefore: false,
  };

  onDragStart = (e, dndData) => {
    this.setState({ dragged: true, dragCopy: dndData.copy });
  };

  onDragEnd = (e, dndData) => {
    this.setState({ dragged: false, dragCopy: false });
  };

  onDragEnter = (e, dndData) => {
    const { video } = this.props;
    if (!this.isValidDragOver(dndData)) return;

    const { item, copy } = dndData;
    this.setState({
      dragOver: true,
      dragOverCopy: copy,
      insertBefore: item.order > video.order,
    });
  };

  onDragLeave = (e, dndData) => {
    this.setState({ dragOver: false, dragOverCopy: false });
  };

  onDragOver = (e, dndData) => {};

  isValidDragOver = (dndData) => {
    const { item, type, copy } = dndData;
    const { video } = this.props;

    if (type !== DRAG_VIDEO_ITEM || item.group !== video.group) return false;
    if (item !== video) return true;

    return copy;
  };

  onDrop = (e, dndData) => {
    if (!this.state.dragOver) return;
    this.setState({ dragOver: false });

    const { order } = this.props.video;
    const video = { ...dndData.item, order };
    const action = dndData.copy
      ? this.props.createVideo
      : this.props.updateVideo;
    action(video);
  };

  openEdit = () => {
    const { watchingType, video } = this.props;
    const edit = true;

    this.props.openVideoModal({
      groupId: video.group,
      watchingType,
      video,
      edit,
    });
  };

  setFinised = () => {
    const rating = promptNumber('Set video rating');
    if (rating === undefined) {
      return;
    }

    const video = {
      ...VideoModel.setFinished(this.props.video),
      rating,
    };
    this.props.updateVideo(video);
  };

  render() {
    const { dragOver, insertBefore, draggable, dragged, dragCopy } = this.state;
    const { video } = this.props;
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
      <DragAndDrop
        draggable={draggable}
        item={this.props.video}
        type={DRAG_VIDEO_ITEM}
        onDragStart={this.onDragStart}
        onDragEnd={this.onDragEnd}
        onDragEnter={this.onDragEnter}
        onDragLeave={this.onDragLeave}
        onDragOver={this.onDragOver}
        onDrop={this.onDrop}
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
              onMouseEnter={() => this.setState({ draggable: true })}
              onMouseLeave={() => this.setState({ draggable: false })}
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
                  VideoModel.isInQueue(video) && 'text-active-2'
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
                <div className='font-bold'>{`${rating} / 10`}</div>
              </div>
            </div>
            <div>
              <div onClick={this.openEdit}>
                <SVGPencil className='w-6 wiggling-clickable'></SVGPencil>
              </div>
              {!VideoModel.isFinished(video) && (
                <div onClick={this.setFinised}>
                  <SVGCheck className='w-6 wiggling-clickable'></SVGCheck>
                </div>
              )}
            </div>
          </div>
        </div>
      </DragAndDrop>
    );
  }
}

export default connect(null, {
  createVideo,
  updateVideo,
  openVideoModal,
})(VideoItem);
