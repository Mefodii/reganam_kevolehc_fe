import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { BLANK_VALUE } from "../../../util/constants";
import { isWatchioFinished, promptNumber } from "../../../util/functions";

import { updateVideo } from "../../../actions/videos";
import { openVideoModal } from "../../../actions/modal";

import SVGPencil from "../../generic/svg/SVGPencil";
import SVGCheck from "../../generic/svg/SVGCheck";
import VideoModel from "../../../models/video";

export class VideoItem extends Component {
  static propTypes = {
    video: PropTypes.object.isRequired,
    watchioType: PropTypes.string.isRequired,
    updateVideo: PropTypes.func.isRequired,
  };

  state = {
    edit: false,
  };

  openEdit = () => {
    const { watchioType, video } = this.props;
    const edit = true;

    this.props.openVideoModal({
      groupId: video.group,
      watchioType,
      video,
      edit,
    });
  };

  setFinised = () => {
    const rating = promptNumber("Set video rating");
    if (rating === undefined) {
      return;
    }

    const video = {
      ...VideoModel.setFinished(this.props.video),
      rating,
    };
    this.props.updateVideo(
      video,
      this.props.video.group,
      this.props.watchioType
    );
  };

  render() {
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
    } = this.props.video;

    return (
      <div className="flex group">
        <div className="my-2 p-2 border-2 shadow-2xl rounded-xl bg-theme-2 border-theme-3 w-full">
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
              <div onClick={this.openEdit}>
                <SVGPencil className="w-6 wiggling-clickable"></SVGPencil>
              </div>
              {!isWatchioFinished(status) && (
                <div onClick={this.setFinised}>
                  <SVGCheck className="w-6 wiggling-clickable"></SVGCheck>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { updateVideo, openVideoModal })(VideoItem);
