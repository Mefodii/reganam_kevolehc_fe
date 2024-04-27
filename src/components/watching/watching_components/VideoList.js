import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import VideoItem from './VideoItem';
import LoadingOverlay from '../../generic/LoadingOverlay';
import { isGroupLoading } from '../../../redux/loadingsSlice';

export class VideoList extends Component {
  static propTypes = {
    watchingType: PropTypes.string.isRequired,
    videos: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
  };

  render() {
    const { watchingType, videos, isLoading } = this.props;

    return (
      <div className='relative max-h-200 overflow-y-auto mt-4 border-t-2 border-theme-3'>
        <LoadingOverlay loading={isLoading} />
        {videos.map((video) => (
          <VideoItem
            video={video}
            key={video.id}
            watchingType={watchingType}
          ></VideoItem>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const groupId = props.videos[0]?.group;
  const isLoading = isGroupLoading(state, groupId);

  return {
    isLoading,
  };
};

export default connect(mapStateToProps, {})(VideoList);
