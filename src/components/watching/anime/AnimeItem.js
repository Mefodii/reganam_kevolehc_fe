import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { deleteAnimeVideo } from "../../../actions/anime";

import Info from "../video_components/Info";
import Title from "../video_components/Title";
import Seasons from "../video_components/Seasons";

export class AnimeItem extends Component {
  static propTypes = {
    video: PropTypes.object.isRequired,
    deleteAnimeVideo: PropTypes.func.isRequired,
  };

  state = {
    name: "",
    alias: "",
    id: 0,
    status: "",
    year: "",
    images: [],
    seasons: [],
  };

  updateStatus = (newStatus) => {
    // TODO
  };

  deleteAnimeVideo = (id, groupId) => () => {
    this.props.deleteAnimeVideo(id, groupId);
  };

  render() {
    const { name, alias, id, status, year, seasons, group } = this.props.video;
    return (
      <div className="flex m-5 p-2 border-2 shadow-2xl rounded-xl bg-secondary border-tertiary">
        <div className="w-full">
          <Title name={name} alias={alias} year={year}></Title>
          <Seasons seasons={seasons} videoId={id}></Seasons>
        </div>
        <Info status={status} updateStatus={this.updateStatus}></Info>
        <div onClick={this.deleteAnimeVideo(id, group)}>Delete</div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  deleteAnimeVideo,
};

export default connect(null, mapDispatchToProps)(AnimeItem);
