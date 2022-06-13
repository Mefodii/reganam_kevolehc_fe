import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import VideoForm from "./VideoForm";
import VideoItem from "./VideoItem";
import Toggler from "./Toggler";

export class VideoList extends Component {
  static propTypes = {
    watchioType: PropTypes.string.isRequired,
    videos: PropTypes.array.isRequired,
  };

  render() {
    const { watchioType, videos, groupId } = this.props;

    return (
      <Fragment>
        {videos.map((video) => (
          <VideoItem
            video={video}
            key={video.id}
            watchioType={watchioType}
          ></VideoItem>
        ))}

        <Toggler activeText="Hide Form" inactiveText="Add new Group">
          <VideoForm
            watchioType={watchioType}
            groupId={groupId}
            hideTitle
            defaultOrder={videos.length > 0 ? videos.at(-1).order + 1 : 1}
          ></VideoForm>
        </Toggler>
      </Fragment>
    );
  }
}

export default VideoList;
