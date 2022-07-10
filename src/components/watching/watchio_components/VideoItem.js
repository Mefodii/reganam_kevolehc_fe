import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import SVGPencil from "../../generic/svg/SVGPencil";
import VideoForm from "./VideoForm";
import { BLANK_VALUE } from "../../../util/constants";
import SVGCheck from "../../generic/svg/SVGCheck";
import { isFinished, setVideoFinished } from "../util/functions";
import { updateVideo } from "../../../actions/videos";

export class VideoItem extends Component {
  static propTypes = {
    video: PropTypes.object.isRequired,
    watchioType: PropTypes.string.isRequired,
    updateVideo: PropTypes.func.isRequired,
  };

  state = {
    edit: false,
  };

  toggleEdit = () => {
    this.setState({ edit: !this.state.edit });
  };

  setFinised = () => {
    const rating = prompt("Set video rating");
    if (isNaN(rating)) {
      alert(`${rating} is not a number`);
      return;
    }

    const video = {
      ...setVideoFinished(this.props.video),
      rating: parseInt(rating),
    };
    this.props.updateVideo(
      video,
      this.props.video.group,
      this.props.watchioType
    );
  };

  render() {
    const edit = this.state.edit;
    const { watchioType } = this.props;
    const {
      name,
      comment,
      aliases,
      status,
      watched_date,
      year,
      current_episode,
      episodes,
      rating,
      group,
    } = this.props.video;

    if (edit) {
      return (
        <VideoForm
          groupId={group}
          video={this.props.video}
          watchioType={watchioType}
          closeForm={this.toggleEdit}
          hideTitle
          edit
        ></VideoForm>
      );
    }

    return (
      <div className="flex group">
        <div className="my-2 p-2 border-2 shadow-2xl rounded-xl bg-secondary border-tertiary w-full">
          <div className="flex flex-col 2xl:flex-row">
            <div className="simple-font w-full break-all">
              <div className="text-xl font-bold">
                {name}
                {comment && (
                  <div className="inline ml-2 opacity-60">[{comment}]</div>
                )}
              </div>
              {aliases.length > 0 && (
                <div className="mt-3">
                  <div className="text-xs">Alias:</div>
                  <div>
                    {aliases.map((alias, i) => (
                      <div key={i}>{" - " + alias}</div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-wrap 2xl:flex-nowrap px-3 text-center">
              <div className="w-24 m-1">
                <div className="text-xs">Status</div>
                <div className="font-bold">{status}</div>
              </div>
              <div className="w-24 m-1">
                <div className="text-xs">{status || "Watched "} Date</div>
                <div className="font-bold">{watched_date || BLANK_VALUE}</div>
              </div>
              <div className="w-24 m-1">
                <div className="text-xs">Episodes</div>
                <div className="font-bold">
                  {current_episode} / {episodes}
                </div>
              </div>
              <div className="w-24 m-1">
                <div className="text-xs">Year</div>
                <div className="font-bold">{year || "----"}</div>
              </div>
              <div className="w-24 m-1">
                <div className="text-xs">Rating</div>
                <div className="font-bold">{`${rating} / 10`}</div>
              </div>
            </div>
            <div>
              <div onClick={this.toggleEdit}>
                <SVGPencil className="w-7 wiggling-clickable"></SVGPencil>
              </div>
              {!isFinished(status) && (
                <div onClick={this.setFinised}>
                  <SVGCheck className="w-7 wiggling-clickable"></SVGCheck>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { updateVideo })(VideoItem);
