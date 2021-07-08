import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { deleteAnimeGroup, addAnimeVideo } from "../../../actions/anime";

import AnimeItem from "./AnimeItem";
import VideoForm from "../video_components/VideoForm";

export class AnimeGroup extends Component {
  static propTypes = {
    group: PropTypes.object.isRequired,
    deleteAnimeGroup: PropTypes.func.isRequired,
  };

  deleteAnimeGroup = (id) => () => {
    this.props.deleteAnimeGroup(id);
  };

  render() {
    const { name, videos, id } = this.props.group;
    return (
      <div className="">
        <div>{name}</div>
        <VideoForm
          submit={this.props.addAnimeVideo}
          type={this.props.animeType}
          groupId={id}
        ></VideoForm>
        <div onClick={this.deleteAnimeGroup(id)}>Delete</div>
        <div className="">
          {videos.map((video) => (
            <AnimeItem video={video} key={video.id}></AnimeItem>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  animeType: state.info.videoTypes.anime,
});

export default connect(mapStateToProps, { deleteAnimeGroup, addAnimeVideo })(
  AnimeGroup
);
