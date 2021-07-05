import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { addAnimePoster, deleteAnimePoster } from "../../../actions/posters";
import { deleteAnime } from "../../../actions/anime";

import Poster from "../video_components/Poster";
import Info from "../video_components/Info";
import Title from "../video_components/Title";
import Seasons from "../video_components/Seasons";

export class AnimeItem extends Component {
  static propTypes = {
    video: PropTypes.object.isRequired,
    addAnimePoster: PropTypes.func.isRequired,
    deleteAnimePoster: PropTypes.func.isRequired,
    deleteAnime: PropTypes.func.isRequired,
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

  deleteAnime = (id) => () => {
    this.props.deleteAnime(id);
  };

  render() {
    const { name, alias, id, status, year, images, seasons, group } =
      this.props.video;
    return (
      <div className="flex m-5 p-2 border-2 shadow-2xl rounded-xl bg-secondary border-tertiary">
        <Poster
          images={images}
          videoId={id}
          groupId={group}
          deletePoster={this.props.deleteAnimePoster}
          addPoster={this.props.addAnimePoster}
        ></Poster>
        <div className="w-full">
          <Title name={name} alias={alias} year={year}></Title>
          <Seasons seasons={seasons} videoId={id}></Seasons>
        </div>
        <Info status={status} updateStatus={this.updateStatus}></Info>
        <div onClick={this.deleteAnime(id)}>Delete</div>
      </div>
    );
  }
}

const mapDispatchToProps = { addAnimePoster, deleteAnimePoster, deleteAnime };

export default connect(null, mapDispatchToProps)(AnimeItem);
