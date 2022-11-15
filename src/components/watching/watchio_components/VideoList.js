import { connect } from "react-redux";
import React, { Component } from "react";
import PropTypes from "prop-types";

import VideoItem from "./VideoItem";
import LoadingOverlay from "../../generic/LoadingOverlay";

export class VideoList extends Component {
  static propTypes = {
    watchioType: PropTypes.string.isRequired,
    videos: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
  };

  render() {
    const { watchioType, videos, isLoading } = this.props;

    return (
      // TODO: withLoadingOverlay -> (props, isLoading)
      <div className="relative max-h-200 overflow-y-auto">
        <LoadingOverlay loading={isLoading} />
        {videos.map((video) => (
          <VideoItem
            video={video}
            key={video.id}
            watchioType={watchioType}
          ></VideoItem>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const groupId = props.videos[0]?.group ?? -1;
  const isLoading = state.loadings.groups.includes(groupId);

  return {
    isLoading,
  };
};

export default connect(mapStateToProps, {})(VideoList);
