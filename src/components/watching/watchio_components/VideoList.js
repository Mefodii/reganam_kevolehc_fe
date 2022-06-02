import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import VideoForm from "./VideoForm";
import VideoItem from "./VideoItem";

export class VideoList extends Component {
  static propTypes = {
    watchioType: PropTypes.string.isRequired,
    videos: PropTypes.array.isRequired,
  };

  state = {
    showVideoForm: false,
  };

  toggleShowVideoForm = () => {
    this.setState({ showVideoForm: !this.state.showVideoForm });
  };

  render() {
    const { showVideoForm } = this.state;
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

        <div className="flex">
          <div className="w-full p-1 border-2 shadow-2xl rounded-xl bg-secondary border-tertiary text-center font-extrabold">
            <div
              className="cursor-pointer mb-1 hover:bg-tertiary/70 opacity-50 hover:opacity-100 transition ease-in duration-150"
              onClick={this.toggleShowVideoForm}
            >
              {showVideoForm ? "↑ Hide form ↑" : "↓ Add new Video ↓"}
            </div>
            {showVideoForm && (
              <VideoForm
                watchioType={watchioType}
                groupId={groupId}
                hideTitle
                defaultOrder={videos.length > 0 ? videos.at(-1).order + 1 : 1}
              ></VideoForm>
            )}
          </div>
        </div>
      </Fragment>
    );
  }
}

export default connect(null, null)(VideoList);
