import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { addAnimePoster, deleteAnimePoster } from "../../../actions/posters";
import { updateAnime } from "../../../actions/videos";

import Poster from "../video_components/Poster";
import Info from "../video_components/Info";
import Title from "../video_components/Title";
import Seasons from "../video_components/Seasons";

export class AnimeItem extends Component {
  static propTypes = {
    video: PropTypes.object.isRequired,
    updateAnime: PropTypes.func.isRequired,
    addAnimePoster: PropTypes.func.isRequired,
    deleteAnimePoster: PropTypes.func.isRequired,
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

  updateAnime = (updatedVideo) => {
    this.props.updateAnime(this.props.video, updatedVideo);
  };

  render() {
    const { name, alias, id, status, year, images, seasons } = this.props.video;
    return (
      <div className="flex m-5 p-2 border-2 shadow-2xl rounded-xl bg-secondary border-tertiary">
        <Poster
          images={images}
          videoId={id}
          deletePoster={this.props.deleteAnimePoster}
          addPoster={this.props.addAnimePoster}
        ></Poster>
        <div className="w-full">
          <Title name={name} alias={alias} year={year}></Title>
          <Seasons seasons={seasons} videoId={id}></Seasons>
        </div>
        <Info status={status} updateStatus={this.updateStatus}></Info>
      </div>
    );
  }
}

const mapDispatchToProps = { addAnimePoster, deleteAnimePoster, updateAnime };

export default connect(null, mapDispatchToProps)(AnimeItem);
