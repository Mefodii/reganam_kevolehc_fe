import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { deleteAnimeVideo, updateAnimeVideo } from "../../../actions/anime";

import SVGPencil from "../../generic/svg/SVGPencil";
import VideoForm from "../video_components/VideoForm";

export class AnimeItem extends Component {
  static propTypes = {
    statusTypes: PropTypes.array.isRequired,
    video: PropTypes.object.isRequired,
    updateAnimeVideo: PropTypes.func.isRequired,
    deleteAnimeVideo: PropTypes.func.isRequired,
  };

  state = {
    edit: false,
  };

  toggleEdit = () => {
    this.setState({ edit: !this.state.edit });
  };

  updateAnimeVideo = (video, group) => {
    this.props.updateAnimeVideo(video, group);
    this.toggleEdit();
  };

  deleteAnimeVideo = () => {
    const { id, group } = this.props.video;
    this.props.deleteAnimeVideo(id, group);
  };

  discardChanges = () => {
    this.toggleEdit();
  };

  render() {
    const edit = this.state.edit;
    const { name, aliases, status, year, episodes, rating, group, type } =
      this.props.video;

    if (edit) {
      return (
        <VideoForm
          submit={this.updateAnimeVideo}
          type={type}
          groupId={group}
          discard={this.discardChanges}
          delete={this.deleteAnimeVideo}
          video={this.props.video}
          hideTitle
          edit
        ></VideoForm>
      );
    }

    return (
      <div className="flex group">
        <div className="my-2 p-2 border-2 shadow-2xl rounded-xl bg-secondary border-tertiary w-full">
          <div className="flex">
            <div className="w-2/3 break-all">
              <div className="text-2xl font-bold overflow-auto">{name}</div>
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
            <div className="flex w-1/3 space-x-2 px-3 text-center">
              <div className="w-full">
                <div className="text-xs">Episodes</div>
                <div className="font-bold">{episodes}</div>
              </div>
              <div className="w-full">
                <div className="text-xs">Status</div>
                <div className="font-bold">{status}</div>
              </div>
              <div className="w-full">
                <div className="text-xs">Year</div>
                <div className="font-bold">{year || "----"}</div>
              </div>
              <div className="w-full">
                <div className="text-xs">Rating</div>
                <div className="font-bold">{`${rating} / 10`}</div>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <div onClick={this.toggleEdit}>
              <SVGPencil className="w-7 wiggling-clickable"></SVGPencil>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  statusTypes: state.info.statusTypes,
});

const mapDispatchToProps = {
  updateAnimeVideo,
  deleteAnimeVideo,
};

export default connect(mapStateToProps, mapDispatchToProps)(AnimeItem);
