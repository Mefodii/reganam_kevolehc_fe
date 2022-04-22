import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  deleteAnimeGroup,
  addAnimeVideo,
  addAnimePoster,
  deleteAnimePoster,
} from "../../../actions/anime";

import AnimeItem from "./AnimeItem";
import VideoForm from "../video_components/VideoForm";
import Poster from "../video_components/Poster";

export class AnimeGroup extends Component {
  static propTypes = {
    group: PropTypes.object.isRequired,
    deleteAnimeGroup: PropTypes.func.isRequired,
    //
    addAnimePoster: PropTypes.func.isRequired,
    deleteAnimePoster: PropTypes.func.isRequired,
  };

  deleteAnimeGroup = (id) => () => {
    this.props.deleteAnimeGroup(id);
  };

  render() {
    const { name, videos, id, images } = this.props.group;
    return (
      <div className="">
        <VideoForm
          submit={this.props.addAnimeVideo}
          type={this.props.animeType}
          groupId={id}
        ></VideoForm>
        <div className="flex">
          <Poster
            images={images}
            groupId={id}
            deletePoster={this.props.deleteAnimePoster}
            addPoster={this.props.addAnimePoster}
          ></Poster>
          <div>
            <div>{name}</div>
            <div className="">
              {videos.map((video) => (
                <AnimeItem video={video} key={video.id}></AnimeItem>
              ))}
            </div>
            <div onClick={this.deleteAnimeGroup(id)}>Delete Group</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  animeType: state.info.videoTypes.anime,
});

const mapDispatchToProps = {
  deleteAnimeGroup,
  addAnimeVideo,
  addAnimePoster,
  deleteAnimePoster,
};

export default connect(mapStateToProps, mapDispatchToProps)(AnimeGroup);
