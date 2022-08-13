import { connect } from "react-redux";
import React, { Component } from "react";
import PropTypes from "prop-types";

import VideoItem from "./VideoItem";
import { openVideoModal } from "../../../actions/modal";

export class VideoList extends Component {
  static propTypes = {
    watchioType: PropTypes.string.isRequired,
    videos: PropTypes.array.isRequired,
    openVideoModal: PropTypes.func.isRequired,
  };

  openVideoModal = () => {
    const { groupId, watchioType, videos } = this.props;
    const defaultOrder = videos.length > 0 ? videos.at(-1).order + 1 : 1;
    const edit = false;
    this.props.openVideoModal({ watchioType, groupId, defaultOrder, edit });
  };

  render() {
    const { watchioType, videos } = this.props;

    return (
      <>
        {videos.map((video) => (
          <VideoItem
            video={video}
            key={video.id}
            watchioType={watchioType}
          ></VideoItem>
        ))}

        <div onClick={this.openVideoModal}>Add Video</div>
      </>
    );
  }
}

export default connect(null, { openVideoModal })(VideoList);
